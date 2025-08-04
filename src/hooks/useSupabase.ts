import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'

type Tables = Database['public']['Tables']

// Generic hook for fetching data from Supabase
export function useSupabaseQuery<T extends keyof Tables>(
  table: T,
  options?: {
    select?: string
    filter?: Record<string, any>
    orderBy?: { column: string; ascending?: boolean }
    limit?: number
  }
) {
  const [data, setData] = useState<Tables[T]['Row'][]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        let query = supabase.from(table).select(options?.select || '*')

        // Apply filters
        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        // Apply ordering
        if (options?.orderBy) {
          query = query.order(options.orderBy.column, { 
            ascending: options.orderBy.ascending ?? true 
          })
        }

        // Apply limit
        if (options?.limit) {
          query = query.limit(options.limit)
        }

        const { data: result, error } = await query

        if (error) throw error

        setData(result || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, JSON.stringify(options)])

  return { data, loading, error, refetch: () => fetchData() }
}

// Hook for real-time subscriptions
export function useSupabaseSubscription<T extends keyof Tables>(
  table: T,
  callback: (payload: any) => void,
  filter?: Record<string, any>
) {
  useEffect(() => {
    let subscription = supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: table as string,
          filter: filter ? Object.entries(filter).map(([key, value]) => `${key}=eq.${value}`).join(',') : undefined
        }, 
        callback
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [table, callback, JSON.stringify(filter)])
}

// Specific hooks for each entity
export const usePatients = (doctorId?: string) => {
  return useSupabaseQuery('patients', {
    filter: doctorId ? { doctor_id: doctorId } : undefined,
    orderBy: { column: 'created_at', ascending: false }
  })
}

export const useDoctors = () => {
  return useSupabaseQuery('doctors', {
    orderBy: { column: 'first_name', ascending: true }
  })
}

export const useAppointments = (userId?: string, userRole?: string) => {
  const filter = userRole === 'patient' 
    ? { patient_id: userId }
    : userRole === 'doctor' 
    ? { doctor_id: userId }
    : undefined

  return useSupabaseQuery('appointments', {
    filter,
    orderBy: { column: 'date', ascending: true }
  })
}

export const useWards = () => {
  return useSupabaseQuery('wards', {
    orderBy: { column: 'name', ascending: true }
  })
}

export const useMedicalRecords = (patientId?: string) => {
  return useSupabaseQuery('medical_records', {
    filter: patientId ? { patient_id: patientId } : undefined,
    orderBy: { column: 'date', ascending: false }
  })
}

export const useLabResults = (patientId?: string) => {
  return useSupabaseQuery('lab_results', {
    filter: patientId ? { patient_id: patientId } : undefined,
    orderBy: { column: 'date', ascending: false }
  })
}