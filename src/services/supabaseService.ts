import { supabase } from '../lib/supabase'
import type { Database } from '../lib/supabase'
import type { Patient, Doctor, Appointment, Ward, MedicalRecord, Lab } from '../types'

type Tables = Database['public']['Tables']

// Patient Services
export const patientService = {
  async getAll(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data.map(transformPatientFromDB)
  },

  async getById(id: string): Promise<Patient | null> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data ? transformPatientFromDB(data) : null
  },

  async create(patient: Omit<Patient, 'id'>): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .insert([transformPatientToDB(patient)])
      .select()
      .single()

    if (error) throw error
    return transformPatientFromDB(data)
  },

  async update(id: string, updates: Partial<Patient>): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .update(transformPatientToDB(updates))
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformPatientFromDB(data)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Doctor Services
export const doctorService = {
  async getAll(): Promise<Doctor[]> {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .order('first_name', { ascending: true })

    if (error) throw error
    return data.map(transformDoctorFromDB)
  },

  async getById(id: string): Promise<Doctor | null> {
    const { data, error } = await supabase
      .from('doctors')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data ? transformDoctorFromDB(data) : null
  },

  async create(doctor: Omit<Doctor, 'id'>): Promise<Doctor> {
    const { data, error } = await supabase
      .from('doctors')
      .insert([transformDoctorToDB(doctor)])
      .select()
      .single()

    if (error) throw error
    return transformDoctorFromDB(data)
  },

  async update(id: string, updates: Partial<Doctor>): Promise<Doctor> {
    const { data, error } = await supabase
      .from('doctors')
      .update(transformDoctorToDB(updates))
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformDoctorFromDB(data)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('doctors')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Appointment Services
export const appointmentService = {
  async getAll(userId?: string, userRole?: string): Promise<Appointment[]> {
    let query = supabase.from('appointments').select('*')

    if (userRole === 'patient' && userId) {
      query = query.eq('patient_id', userId)
    } else if (userRole === 'doctor' && userId) {
      query = query.eq('doctor_id', userId)
    }

    const { data, error } = await query.order('date', { ascending: true })

    if (error) throw error
    return data.map(transformAppointmentFromDB)
  },

  async create(appointment: Omit<Appointment, 'id'>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .insert([transformAppointmentToDB(appointment)])
      .select()
      .single()

    if (error) throw error
    return transformAppointmentFromDB(data)
  },

  async update(id: string, updates: Partial<Appointment>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .update(transformAppointmentToDB(updates))
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformAppointmentFromDB(data)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Ward Services
export const wardService = {
  async getAll(): Promise<Ward[]> {
    const { data, error } = await supabase
      .from('wards')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data.map(transformWardFromDB)
  },

  async create(ward: Omit<Ward, 'id'>): Promise<Ward> {
    const { data, error } = await supabase
      .from('wards')
      .insert([transformWardToDB(ward)])
      .select()
      .single()

    if (error) throw error
    return transformWardFromDB(data)
  },

  async update(id: string, updates: Partial<Ward>): Promise<Ward> {
    const { data, error } = await supabase
      .from('wards')
      .update(transformWardToDB(updates))
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformWardFromDB(data)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('wards')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Medical Record Services
export const medicalRecordService = {
  async getAll(patientId?: string): Promise<MedicalRecord[]> {
    let query = supabase.from('medical_records').select('*')

    if (patientId) {
      query = query.eq('patient_id', patientId)
    }

    const { data, error } = await query.order('date', { ascending: false })

    if (error) throw error
    return data.map(transformMedicalRecordFromDB)
  },

  async create(record: Omit<MedicalRecord, 'id'>): Promise<MedicalRecord> {
    const { data, error } = await supabase
      .from('medical_records')
      .insert([transformMedicalRecordToDB(record)])
      .select()
      .single()

    if (error) throw error
    return transformMedicalRecordFromDB(data)
  },

  async update(id: string, updates: Partial<MedicalRecord>): Promise<MedicalRecord> {
    const { data, error } = await supabase
      .from('medical_records')
      .update(transformMedicalRecordToDB(updates))
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformMedicalRecordFromDB(data)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('medical_records')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Lab Results Services
export const labService = {
  async getAll(patientId?: string): Promise<Lab[]> {
    let query = supabase.from('lab_results').select('*')

    if (patientId) {
      query = query.eq('patient_id', patientId)
    }

    const { data, error } = await query.order('date', { ascending: false })

    if (error) throw error
    return data.map(transformLabFromDB)
  },

  async create(lab: Omit<Lab, 'id'>): Promise<Lab> {
    const { data, error } = await supabase
      .from('lab_results')
      .insert([transformLabToDB(lab)])
      .select()
      .single()

    if (error) throw error
    return transformLabFromDB(data)
  },

  async update(id: string, updates: Partial<Lab>): Promise<Lab> {
    const { data, error } = await supabase
      .from('lab_results')
      .update(transformLabToDB(updates))
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return transformLabFromDB(data)
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('lab_results')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
}

// Transform functions to convert between DB format and app format
function transformPatientFromDB(dbPatient: Tables['patients']['Row']): Patient {
  return {
    id: dbPatient.id,
    patientId: dbPatient.patient_id,
    userId: dbPatient.user_id || undefined,
    doctorId: dbPatient.doctor_id || undefined,
    firstName: dbPatient.first_name,
    lastName: dbPatient.last_name,
    dateOfBirth: dbPatient.date_of_birth,
    gender: dbPatient.gender,
    bloodType: dbPatient.blood_type as Patient['bloodType'],
    contactNumber: dbPatient.contact_number,
    email: dbPatient.email,
    address: dbPatient.address,
    status: dbPatient.status,
    emergencyContact: dbPatient.emergency_contact,
    insuranceDetails: dbPatient.insurance_details || undefined
  }
}

function transformPatientToDB(patient: Partial<Patient>): Partial<Tables['patients']['Insert']> {
  return {
    patient_id: patient.patientId,
    user_id: patient.userId,
    doctor_id: patient.doctorId,
    first_name: patient.firstName,
    last_name: patient.lastName,
    date_of_birth: patient.dateOfBirth,
    gender: patient.gender,
    blood_type: patient.bloodType,
    contact_number: patient.contactNumber,
    email: patient.email,
    address: patient.address,
    status: patient.status,
    emergency_contact: patient.emergencyContact,
    insurance_details: patient.insuranceDetails
  }
}

function transformDoctorFromDB(dbDoctor: Tables['doctors']['Row']): Doctor {
  return {
    id: dbDoctor.id,
    userId: dbDoctor.user_id,
    firstName: dbDoctor.first_name,
    lastName: dbDoctor.last_name,
    specialization: dbDoctor.specialization,
    department: dbDoctor.department,
    contactNumber: dbDoctor.contact_number,
    email: dbDoctor.email,
    licenseNumber: dbDoctor.license_number,
    availability: dbDoctor.availability || []
  }
}

function transformDoctorToDB(doctor: Partial<Doctor>): Partial<Tables['doctors']['Insert']> {
  return {
    user_id: doctor.userId,
    first_name: doctor.firstName,
    last_name: doctor.lastName,
    specialization: doctor.specialization,
    department: doctor.department,
    contact_number: doctor.contactNumber,
    email: doctor.email,
    license_number: doctor.licenseNumber,
    availability: doctor.availability
  }
}

function transformAppointmentFromDB(dbAppointment: Tables['appointments']['Row']): Appointment {
  return {
    id: dbAppointment.id,
    patientId: dbAppointment.patient_id,
    doctorId: dbAppointment.doctor_id,
    date: dbAppointment.date,
    startTime: dbAppointment.start_time,
    endTime: dbAppointment.end_time,
    status: dbAppointment.status,
    type: dbAppointment.type,
    notes: dbAppointment.notes || undefined,
    createdBy: dbAppointment.created_by
  }
}

function transformAppointmentToDB(appointment: Partial<Appointment>): Partial<Tables['appointments']['Insert']> {
  return {
    patient_id: appointment.patientId,
    doctor_id: appointment.doctorId,
    date: appointment.date,
    start_time: appointment.startTime,
    end_time: appointment.endTime,
    status: appointment.status,
    type: appointment.type,
    notes: appointment.notes,
    created_by: appointment.createdBy
  }
}

function transformWardFromDB(dbWard: Tables['wards']['Row']): Ward {
  return {
    id: dbWard.id,
    name: dbWard.name,
    type: dbWard.type,
    floorNumber: dbWard.floor_number,
    totalBeds: dbWard.total_beds,
    availableBeds: dbWard.available_beds,
    managedBy: dbWard.managed_by
  }
}

function transformWardToDB(ward: Partial<Ward>): Partial<Tables['wards']['Insert']> {
  return {
    name: ward.name,
    type: ward.type,
    floor_number: ward.floorNumber,
    total_beds: ward.totalBeds,
    available_beds: ward.availableBeds,
    managed_by: ward.managedBy
  }
}

function transformMedicalRecordFromDB(dbRecord: Tables['medical_records']['Row']): MedicalRecord {
  return {
    id: dbRecord.id,
    patientId: dbRecord.patient_id,
    doctorId: dbRecord.doctor_id,
    date: dbRecord.date,
    diagnosis: dbRecord.diagnosis,
    symptoms: dbRecord.symptoms,
    treatment: dbRecord.treatment,
    notes: dbRecord.notes,
    lastUpdated: dbRecord.last_updated,
    lastUpdatedBy: dbRecord.last_updated_by
  }
}

function transformMedicalRecordToDB(record: Partial<MedicalRecord>): Partial<Tables['medical_records']['Insert']> {
  return {
    patient_id: record.patientId,
    doctor_id: record.doctorId,
    date: record.date,
    diagnosis: record.diagnosis,
    symptoms: record.symptoms,
    treatment: record.treatment,
    notes: record.notes,
    last_updated: record.lastUpdated,
    last_updated_by: record.lastUpdatedBy
  }
}

function transformLabFromDB(dbLab: Tables['lab_results']['Row']): Lab {
  return {
    id: dbLab.id,
    patientId: dbLab.patient_id,
    doctorId: dbLab.doctor_id,
    testType: dbLab.test_type,
    date: dbLab.date,
    results: dbLab.results || undefined,
    status: dbLab.status,
    reportUrl: dbLab.report_url || undefined,
    requestedBy: dbLab.requested_by
  }
}

function transformLabToDB(lab: Partial<Lab>): Partial<Tables['lab_results']['Insert']> {
  return {
    patient_id: lab.patientId,
    doctor_id: lab.doctorId,
    test_type: lab.testType,
    date: lab.date,
    results: lab.results,
    status: lab.status,
    report_url: lab.reportUrl,
    requested_by: lab.requestedBy
  }
}