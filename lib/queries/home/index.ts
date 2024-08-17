'use server'
import { prisma } from '@/lib/prisma'
import { Review, User } from '@prisma/client'

export interface GetSpecializationParams {
  page?: number
  pageSize?: number
  searchQuery?: string
}

export const getAllSpecializations = async (
  params: GetSpecializationParams
) => {
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

export const getSpecializationWithId = async ({ id }: { id: string }) => {
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
}

export interface GetDoctorParams {
  page?: number
  pageSize?: number
  searchQuery?: string
}

export const getAllDoctors = async (params: GetDoctorParams) => {
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
}

export const getDoctorById = async ({ id }: { id: string }) => {
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
}

export const getAllDoctorsWithReviews = async () => {
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
}

export interface GetIllnessParams {
  page?: number
  pageSize?: number
  searchQuery?: string
  filter?: string
}
export const getAllIllnesses = async (params: GetIllnessParams) => {
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
}
export const getIllnessesById = async ({ id }: { id: string }) => {
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
}
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
            // type === 'specialization'
            //   ? item.id
            //   : type === 'contributor'
            //     ? item.id
            //     :item.id,
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
        where: { [modelInfo.searchField]: regexQuery },
        take: 8,
      })

      results = queryResults.map((item: any) => ({
        title: item[modelInfo.searchField],
        // type === 'specialization'
        //   ? `تخصص شامل ${query}`
        //   : item[modelInfo.searchField],
        type,
        id: item.id,
        // type === 'specialization'
        //   ? item.id
        //   : // : type === 'answer'
        //     // ? item.questionId
        //     item.id,
      }))
    }
    // console.log(results)
    return JSON.stringify(results)
  } catch (error) {
    console.log(error)
    throw error
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
