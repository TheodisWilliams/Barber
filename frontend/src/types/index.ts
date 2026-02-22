// Core types for the application
export interface Barber {
  id: number;
  attributes: {
    name: string;
    slug: string;
    photo: {
      data: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    } | null;
    bio: string;
    specialties: string[];
    instagramHandle?: string;
    isActive: boolean;
    order: number;
    workingHours: WorkingHours;
    services?: {
      data: Service[];
    };
  };
}

export interface Service {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    durationMinutes: number;
    price: number;
    isActive: boolean;
    order: number;
    category: 'haircut' | 'shave' | 'styling' | 'specialty' | 'package';
  };
}

export interface Appointment {
  id?: number;
  barber: {
    data: Barber;
  };
  service: {
    data: Service;
  };
  startAt: string;
  endAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  status: 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  confirmationCode?: string;
}

export interface WorkingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  enabled: boolean;
  start: string | null;
  end: string | null;
  breaks?: TimeSlot[];
}

export interface TimeSlot {
  start: string;
  end: string;
}

export interface AvailableSlot {
  time: string;
  available: boolean;
}

export interface ShopInfo {
  id: number;
  attributes: {
    name: string;
    tagline: string;
    description: string;
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    socialMedia: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
    defaultWorkingHours: WorkingHours;
  };
}

export interface Testimonial {
  id: number;
  attributes: {
    customerName: string;
    rating: number;
    review: string;
    barber?: {
      data: Barber;
    };
    isPublic: boolean;
    order: number;
  };
}

export interface BookingFormData {
  barberId: number;
  serviceId: number;
  date: string;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}
