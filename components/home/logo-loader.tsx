'use client'
import { motion } from 'framer-motion'

const LogoLoader = (props: any) => (
  <motion.div
    className="min-h-screen w-full flex flex-col h-screen"
    // initial={{ opacity: 1 }}
    // whileInView={{ opacity: 0 }}
    // it appears and after 4 seconds (3s delay + 1s duration) it disappears (opacity-0)
    // transition={{ delay: 3, duration: 1 }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width={183} height={180} {...props}>
      <motion.path
        fill="none"
        stroke="#6224FF"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        //   whileInView doesn't work with "path"
        // animate={isInView && { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 5 }}
        d="M64.1 51V9s.887-5.831 5-6c5.913-.169 50.9 0 50.9 0s4.987-.831 5 5c.013 5.831 0 51.1 0 51.1h50.1s5.012.569 4 5.9c.788 5.331 0 52.1 0 52.1s.637 3.819-4 3.9c-2.837.081-45.1 0-45.1 0s-3.013 1.294-6.9-4c-2.087-5.294-11.738-20.706-18-26.9-4.462-4.394-18.225-21.1-31.1-27C63.875 59.25 64.1 51 64.1 51zM5 59.1c10.1.525 32.1 0 32.1 0S65.237 66.169 71 70c7.638 5.331 21.612 16.544 25 20.1 3.388 5.356 12.862 12.194 20.1 27 9.038 16.606 8.012 13.444 9 20.9 1.038 9.331 0 33.1 0 33.1s.262 6.069-5.1 5c-5.362.731-49 0-49 0s-2.388 1.194-6.9-5.1c.538-4.794 0-41.9 0-41.9s4.137-.181 7 5c1.413.231 0 36.9 0 36.9h47v-32.9s-4.113-11.931-20-15c-14.087-1.269-44.113.069-57.1-6.1-12.987-6.169-35.013-16.144-38-52 5.513 10.269 36.487 37.981 66.1 34.1-.087 2.169-49.85-9.225-64.1-40z"
      />
    </svg>
  </motion.div>
)
export default LogoLoader
