'use client'
import { ReactNode } from 'react'

const SkewedInfiniteScroll = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div
          className="relative w-full max-w-screen-lg overflow-hidden"
          style={{
            maskComposite: 'intersect',
            maskImage: `
          linear-gradient(to right,  transparent, black 5rem),
          linear-gradient(to left,   transparent, black 5rem),
          linear-gradient(to bottom, transparent, black 5rem),
          linear-gradient(to top,    transparent, black 5rem)
        `,
          }}
        >
          <div className="mx-auto grid h-[250px] w-[300px] animate-skew-scroll grid-cols-1 gap-5 sm:w-[600px] sm:grid-cols-2">
            {/* {items.map((item) => (
              <div
                key={item.id}
                className="flex cursor-pointer items-center space-x-2 rounded-md border border-gray-100 px-5 shadow-md transition-all hover:-translate-y-1 hover:translate-x-1 hover:scale-[1.025] hover:shadow-xl dark:border-gray-800"
              > */}

            {children}
            {/* </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkewedInfiniteScroll

// module.exports = {
//   theme: {
//     extend: {
//       animation: {
//         'skew-scroll': 'skew-scroll 20s linear infinite',
//       },
//       keyframes: {
//         'skew-scroll': {
//           '0%': {
//             transform:
//               'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)',
//           },
//           '100%': {
//             transform:
//               'rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)',
//           },
//         },
//       },
//     },
//   },
// }
