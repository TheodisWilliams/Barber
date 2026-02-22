// Strapi API client
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchAPI(
  path: string,
  options: RequestInit = {}
): Promise<any> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    ...options,
  };

  const url = `${STRAPI_URL}/api${path}`;

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Strapi fetch error:', error);
    throw error;
  }
}

export async function getBarbers(populate = 'photo,services') {
  return fetchAPI(`/barbers?populate=${populate}&sort=order:asc&filters[isActive][$eq]=true`);
}

export async function getBarberBySlug(slug: string) {
  return fetchAPI(`/barbers?filters[slug][$eq]=${slug}&populate=photo,services`);
}

export async function getServices() {
  return fetchAPI('/services?sort=order:asc&filters[isActive][$eq]=true');
}

export async function getShopInfo() {
  return fetchAPI('/shop-info?populate=*');
}

export async function getTestimonials() {
  return fetchAPI('/testimonials?populate=barber&sort=order:asc&filters[isPublic][$eq]=true');
}

export async function getAppointments(barberId?: number, date?: string) {
  let query = '/appointments?populate=barber,service';

  if (barberId) {
    query += `&filters[barber][id][$eq]=${barberId}`;
  }

  if (date) {
    query += `&filters[startAt][$gte]=${date}T00:00:00&filters[startAt][$lte]=${date}T23:59:59`;
  }

  return fetchAPI(query);
}

export async function createAppointment(data: any) {
  return fetchAPI('/appointments', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
}
