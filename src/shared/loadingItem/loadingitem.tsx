import { motion } from 'framer-motion'


import './ui/loadingItem.css'


const LoadingItem = () => {
    return (
        <div className='loading-item-wrapper'>
            <motion.div className='loading-item'
            animate={
                {   rotate:360,
                    scale: [1,1.5,1],
                    borderRadius: [80,100,150]
                }
                
            }
            transition={{
                duration:1,
                repeat:Infinity,
                ease:"easeOut",
                repeatType:'loop',
                delay:-5
            }}
            >

            </motion.div>
        </div>
    )
}

export default LoadingItem