import {
  getAllDoctors,
  getAllIllnesses,
  getAllSpecializations,
} from '@/lib/queries/home'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const doctors = await getAllDoctors({})
  const specialization = await getAllSpecializations({})
  const illnesses = await getAllIllnesses({})

  let allEntries: MetadataRoute.Sitemap = []

  if (doctors?.doctors.length) {
    const doctorEntries: MetadataRoute.Sitemap = doctors?.doctors?.map(
      (item) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/doctors/${item.id}`,
        lastModified: new Date(item.updated_at),
      })
    )
    allEntries = [...allEntries, ...doctorEntries]
  }
  if (specialization?.specializations.length) {
    const specializationEntries: MetadataRoute.Sitemap =
      specialization?.specializations.map((item) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/specialities/${item.id}`,
        lastModified: new Date(item.updated_at),
      }))
    allEntries = [...specializationEntries, ...allEntries]
  }
  if (illnesses?.illnesses?.length) {
    const illnessEntries: MetadataRoute.Sitemap = illnesses.illnesses?.map(
      (item) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/illnesses/${item.id}`,
        lastModified: new Date(item.updated_at),
      })
    )
    allEntries = [...allEntries, ...illnessEntries]
  }

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/faq`,
    },
    ...allEntries,
  ]
}
