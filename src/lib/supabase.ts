import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (you can generate these from Supabase CLI)
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'admin' | 'doctor' | 'patient'
          avatar?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: 'admin' | 'doctor' | 'patient'
          avatar?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'admin' | 'doctor' | 'patient'
          avatar?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          patient_id: string
          user_id?: string
          doctor_id?: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other'
          blood_type?: string
          contact_number: string
          email: string
          address: string
          status: 'active' | 'inactive' | 'pending' | 'discharged'
          emergency_contact: any
          insurance_details?: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          user_id?: string
          doctor_id?: string
          first_name: string
          last_name: string
          date_of_birth: string
          gender: 'male' | 'female' | 'other'
          blood_type?: string
          contact_number: string
          email: string
          address: string
          status?: 'active' | 'inactive' | 'pending' | 'discharged'
          emergency_contact: any
          insurance_details?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          patient_id?: string
          user_id?: string
          doctor_id?: string
          first_name?: string
          last_name?: string
          date_of_birth?: string
          gender?: 'male' | 'female' | 'other'
          blood_type?: string
          contact_number?: string
          email?: string
          address?: string
          status?: 'active' | 'inactive' | 'pending' | 'discharged'
          emergency_contact?: any
          insurance_details?: any
          updated_at?: string
        }
      }
      doctors: {
        Row: {
          id: string
          user_id: string
          first_name: string
          last_name: string
          specialization: string
          department: string
          contact_number: string
          email: string
          license_number: string
          availability: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name: string
          last_name: string
          specialization: string
          department: string
          contact_number: string
          email: string
          license_number: string
          availability?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          first_name?: string
          last_name?: string
          specialization?: string
          department?: string
          contact_number?: string
          email?: string
          license_number?: string
          availability?: any
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          date: string
          start_time: string
          end_time: string
          status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          type: 'regular' | 'follow-up' | 'emergency'
          notes?: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          date: string
          start_time: string
          end_time: string
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          type: 'regular' | 'follow-up' | 'emergency'
          notes?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          patient_id?: string
          doctor_id?: string
          date?: string
          start_time?: string
          end_time?: string
          status?: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
          type?: 'regular' | 'follow-up' | 'emergency'
          notes?: string
          created_by?: string
          updated_at?: string
        }
      }
      wards: {
        Row: {
          id: string
          name: string
          type: 'general' | 'icu' | 'emergency' | 'maternity' | 'pediatric' | 'surgical'
          floor_number: number
          total_beds: number
          available_beds: number
          managed_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'general' | 'icu' | 'emergency' | 'maternity' | 'pediatric' | 'surgical'
          floor_number: number
          total_beds: number
          available_beds: number
          managed_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          type?: 'general' | 'icu' | 'emergency' | 'maternity' | 'pediatric' | 'surgical'
          floor_number?: number
          total_beds?: number
          available_beds?: number
          managed_by?: string
          updated_at?: string
        }
      }
      medical_records: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          date: string
          diagnosis: string
          symptoms: string[]
          treatment: string
          notes: string
          last_updated: string
          last_updated_by: string
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          date: string
          diagnosis: string
          symptoms: string[]
          treatment: string
          notes: string
          last_updated?: string
          last_updated_by: string
          created_at?: string
        }
        Update: {
          patient_id?: string
          doctor_id?: string
          date?: string
          diagnosis?: string
          symptoms?: string[]
          treatment?: string
          notes?: string
          last_updated?: string
          last_updated_by?: string
        }
      }
      lab_results: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          test_type: string
          date: string
          results?: string
          status: 'pending' | 'completed' | 'cancelled'
          report_url?: string
          requested_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          test_type: string
          date: string
          results?: string
          status?: 'pending' | 'completed' | 'cancelled'
          report_url?: string
          requested_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          patient_id?: string
          doctor_id?: string
          test_type?: string
          date?: string
          results?: string
          status?: 'pending' | 'completed' | 'cancelled'
          report_url?: string
          requested_by?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}