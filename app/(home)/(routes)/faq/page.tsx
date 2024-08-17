// import FaqComment from '@/components/FaqComment'
// import FaqPost from '@/components/FaqPost'
import UserReviews from '@/components/home/Doctor/UserReviews'
import Accordion from '@/components/home/faq/Accordion'
import FaqComment from '@/components/home/faq/FaqComment'
import { currentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type Props = {}

interface Question {
  id: number
  questionTitle: string
  answer: string
}
const questions: Question[] = [
  {
    id: 1,
    questionTitle: 'ساعات فعالیت کلینیک چگونه است؟',
    answer:
      'کلینیک آئین شفق همه‌روزه از ساعت 8 صبح تا 12 شب پذیرای بیماران درمانگاهی است.',
  },
  {
    id: 2,
    questionTitle: 'ساعات کار متخصصین کلینیک را از کجا پیدا کنیم؟',
    answer:
      'کلینیک آئین شفق همه‌روزه از ساعت 8 صبح تا 12 شب پذیرای بیماران درمانگاهی است.',
  },
  {
    id: 3,
    questionTitle:
      'آیا خدمات زیبایی مانند لیزر، بوتاکس و تزریق ژل نیز در کلینیک انجام می‌شود؟',
    answer:
      'کلینیک آئین شفق همه‌روزه از ساعت 8 صبح تا 12 شب پذیرای بیماران درمانگاهی است.',
  },
  {
    id: 4,
    questionTitle:
      'خدمات درمانگاهی و سرپایی مانند وصل سرم، انجام بخیه و پانسمان در چه ساعاتی انجام می‌شود؟',
    answer:
      'کلینیک آئین شفق همه‌روزه از ساعت 8 صبح تا 12 شب پذیرای بیماران درمانگاهی است.',
  },
]
async function FAQPage({}: Props) {
  const user = await currentUser()

  const userWithPic = await prisma.user.findFirst({
    where: { id: user?.id },
  })
  const beforeRated = await prisma.review.findFirst({
    where: {
      userId: user?.id,
      isFaq: true,
    },
    select: {
      rating: true,
    },
  })

  const reviews = await prisma.review.findMany({
    where: { isFaq: true },
    include: { user: { include: { image: { select: { url: true } } } } },
  })

  return (
    <section className=" gradient-base-r flex  w-full flex-col items-center justify-start  min-h-screen ">
      <div className="container rounded-lg shadow-xl w-full h-fit mt-20 lg:mt-24">
        <div className=" p-8 ">
          <Accordion
            items={questions.map((question) => {
              const { questionTitle: title, answer: content } = question
              return { title, content }
            })}
          />
        </div>
      </div>
      <article className="flex flex-col items-center justify-center">
        {!beforeRated && <FaqComment user={userWithPic} />}

        <UserReviews reviews={reviews} />
      </article>
    </section>
  )
}

export default FAQPage
