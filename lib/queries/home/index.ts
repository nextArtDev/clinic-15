'use server'
import { prisma } from '@/lib/prisma'
import { Review, User } from '@prisma/client'
import { getMonth } from 'date-fns-jalali'
import { cache } from 'react'

export interface GetSpecializationParams {
  page?: number
  pageSize?: number
  searchQuery?: string
}

export const getAllSpecializations = cache(
  async (params: GetSpecializationParams) => {
    const { searchQuery, page = 1, pageSize = 10 } = params

    const skipAmount = (page - 1) * pageSize
    const query: any = {} // This will be used to build the Prisma query

    if (searchQuery) {
      query.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ]
    }

    try {
      const specializations = await prisma.specialization.findMany({
        where: query,
        include: {
          images: { select: { url: true } },
          doctors: {
            include: { images: { select: { url: true } } },
          },
        },
        skip: skipAmount,
        take: pageSize,
      })
      const totalSpecializations = await prisma.specialization.count({
        where: query,
      })

      // Calculate if there are more questions to be fetched
      const isNext = totalSpecializations > skipAmount + specializations.length
      return { specializations, isNext }
    } catch (error) {
      console.log(error)
    }
  }
)

export const getSpecializationWithId = cache(async ({ id }: { id: string }) => {
  try {
    const specialization = await prisma.specialization.findUnique({
      where: { id },
      include: {
        images: { select: { url: true } },
        doctors: {
          include: { images: { select: { url: true } }, open_time: true },
        },
        illness: {
          include: { images: { select: { url: true } } },
        },
      },
    })

    return specialization
  } catch (error) {
    console.log(error)
  }
})

export interface GetDoctorParams {
  page?: number
  pageSize?: number
  searchQuery?: string
}

export const getAllDoctors = cache(async (params: GetDoctorParams) => {
  try {
    const { searchQuery, page = 1, pageSize = 10 } = params

    const skipAmount = (page - 1) * pageSize
    const query: any = {}

    if (searchQuery) {
      query.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ]
    }

    const doctors = await prisma.doctor.findMany({
      where: query,
      include: {
        images: { select: { url: true } },
        open_time: true,
      },
      skip: skipAmount,
      take: pageSize,
    })
    const doctorsWithRatings = await Promise.all(
      doctors.map(async (doctor) => {
        const doctorAverageRating = await prisma.review.aggregate({
          where: {
            doctorId: doctor.id,
          },
          _avg: {
            rating: true,
          },
        })
        return {
          ...doctor,
          averageRating: doctorAverageRating._avg.rating || null, // Handle case where there are no ratings
        }
      })
    )
    const totalDoctors = await prisma.doctor.count({ where: query })

    // Calculate if there are more questions to be fetched
    const isNext = totalDoctors > skipAmount + doctors.length

    return { doctors, isNext, doctorsWithRatings }
  } catch (error) {
    console.log(error)
  }
})

export const getDoctorById = cache(async ({ id }: { id: string }) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        images: { select: { url: true } },
        reviews: {
          include: { user: { include: { image: { select: { url: true } } } } },
        },
        illnesses: true,
        open_time: true,
      },
    })
    const doctorAverageRating = await prisma.review.aggregate({
      where: {
        doctorId: id,
      },
      _avg: {
        rating: true,
      },
    })
    return { doctor, rate: doctorAverageRating._avg.rating }
  } catch (error) {
    console.log(error)
  }
})

export const getAllDoctorsWithReviews = cache(async () => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        images: { select: { url: true } },
        reviews: true,
      },
    })
    return doctors
  } catch (error) {
    console.log(error)
  }
})

export interface GetIllnessParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  filter?: string
}
export const getAllIllnesses = cache(async (params: GetIllnessParams) => {
  try {
    const { searchQuery, page = 1, pageSize = 10 } = params
    const skipAmount = (page - 1) * pageSize
    const query: any = {} // This will be used to build the Prisma query

    if (searchQuery) {
      query.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ]
    }

    const illnesses = await prisma.illness.findMany({
      where: query,
      include: {
        images: { select: { url: true } },
      },
      skip: skipAmount,
      take: pageSize,
    })
    // Fetch the total count of questions for pagination
    const totalIllnesses = await prisma.illness.count({ where: query })

    // Calculate if there are more Illnesses to be fetched
    const isNext = totalIllnesses > skipAmount + illnesses.length

    return { illnesses, isNext }
  } catch (error) {
    console.log(error)
  }
})
export const getIllnessesById = cache(async ({ id }: { id: string }) => {
  try {
    const illness = await prisma.illness.findUnique({
      where: { id },
      include: {
        images: { select: { url: true } },
      },
    })
    return illness
  } catch (error) {
    console.log(error)
  }
})
// Global Search
export interface SearchParams {
  query?: string | null
  type?: string | null
}

const searchableHomeTypes = ['specialization', 'doctor', 'illness']

export async function globalHomeSearch(params: SearchParams) {
  try {
    const { query, type } = params

    const regexQuery = { contains: query }

    let results = []

    const modelsAndTypes = [
      { model: prisma.doctor, searchField: 'name', type: 'doctor' },
      { model: prisma.doctor, searchField: 'description', type: 'doctor' },

      {
        model: prisma.specialization,
        searchField: 'name',
        type: 'specialization',
      },
      {
        model: prisma.specialization,
        searchField: 'description',
        type: 'specialization',
      },

      { model: prisma.illness, searchField: 'name', type: 'illness' },
      { model: prisma.illness, searchField: 'description', type: 'illness' },
    ]

    const typeLower = type?.toLowerCase()

    if (!typeLower || !searchableHomeTypes.includes(typeLower)) {
      // Search across everything

      for (const { model, searchField, type } of modelsAndTypes) {
        //@ts-ignore
        const queryResults = await model.findMany({
          where: { [searchField]: regexQuery },
          take: 3,
        })

        results.push(
          ...queryResults.map((item: any) => ({
            title: item[searchField],

            type,

            id: item.id,
          }))
        )
      }
    } else {
      // Search across specific model type
      const modelInfo = modelsAndTypes.find((item) => item.type === type)

      if (!modelInfo) {
        throw new Error('invalid search type')
      }
      //@ts-ignore
      const queryResults = await modelInfo.model.findMany({
        where: { OR: [{ name: regexQuery }, { description: regexQuery }] },
        take: 5,
      })

      results = queryResults.map((item: any) => ({
        title: item[modelInfo.searchField],
        type,
        id: item.id,
      }))
    }
    // console.log(results)
    return JSON.stringify(results)
  } catch (error) {
    console.log(error)
    throw error
  }
}
export const getAllPersonnel = async () => {
  try {
    const personnel = await prisma.personnel.findMany({
      where: {},
      include: {
        images: {
          select: {
            url: true,
          },
        },
      },
    })
    return personnel
  } catch (error) {
    console.log(error)
  }
}

export const getAllReviews = async () => {
  try {
    const reviews = await prisma.review.findMany({
      where: {},
      include: {
        user: {
          select: {
            name: true,
          },
        },
        doctor: {
          select: {
            id: true,
          },
        },
      },
      take: 14,
      orderBy: {
        created_at: 'desc',
      },
    })

    return reviews
  } catch (error) {
    console.log(error)
  }
}
export const getUserWithReviewsById = async ({ id }: { id: string }) => {
  try {
    return await prisma.user.findFirst({
      where: {
        id,
      },
      include: {
        Review: true,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
export type ReviewsWithUserAndImage = Review & {
  user:
    | (Partial<User> & {
        image: {
          url: string
        } | null
      })
    | null
}

interface GraphData {
  name: string
  total: number
}

export const getGraphRevenue = async (): Promise<GraphData[]> => {
  const booked = await prisma.bookedDay.findMany({
    where: {
      isBooked: true,
    },
    include: {
      doctor: {
        include: {
          specialization: true,
        },
      },
    },
  })
  // const numberOfBooked = await prisma.bookedDay.count({
  //   where: {
  //     isBooked: true,
  //   },
  // })
  const monthlyRevenue: { [key: number]: number } = {}

  // Grouping the orders by month and summing the revenue
  for (const book of booked) {
    const month = getMonth(book.created_at) // 0 for Jan, 1 for Feb, ...
    console.log(' getMonth(book.created_at)', getMonth(book.created_at))

    let revenueForOrder = 0

    for (const item of booked) {
      if (item.isBooked) {
        revenueForOrder += 1
      }
    }
    console.log('revenueForOrder', revenueForOrder)

    // Adding the revenue for this order to the respective month
    monthlyRevenue[month] = revenueForOrder
    console.log(' monthlyRevenue[month]', monthlyRevenue[month])
  }

  // Converting the grouped data into the format expected by the graph
  const graphData: GraphData[] = [
    { name: 'فروردین', total: 0 },
    { name: 'اردیبهشت', total: 0 },
    { name: 'خرداد', total: 0 },
    { name: 'تیر', total: 0 },
    { name: 'مرداد', total: 0 },
    { name: 'شهریور', total: 0 },
    { name: 'مهر', total: 0 },
    { name: 'آبان', total: 0 },
    { name: 'آذر', total: 0 },
    { name: 'دی', total: 0 },
    { name: 'بهمن', total: 0 },
    { name: 'اسفند', total: 0 },
  ]

  // Filling in the revenue data
  for (const month in monthlyRevenue) {
    graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)]
  }

  return graphData
}
