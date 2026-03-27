import mongoose from 'mongoose'
import dns from 'dns'
import 'dotenv/config'
import appointmentModel from './models/appointmentModel.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dns.setDefaultResultOrder('ipv4first')

const fix = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected\n')

  const all = await appointmentModel.find({})
  console.log(`Total appointments: ${all.length}`)

  let i = 0
  for (const appt of all) {
    let update = {}

    // Every 10th one → cancelled, rest → completed or paid+upcoming
    if (i % 10 === 9) {
      update = { cancelled: true, isCompleted: false, payment: false }
    } else if (i % 3 === 0) {
      update = { cancelled: false, isCompleted: true, payment: true }
    } else if (i % 3 === 1) {
      update = { cancelled: false, isCompleted: true, payment: false }
    } else {
      update = { cancelled: false, isCompleted: false, payment: true }
    }

    await appointmentModel.findByIdAndUpdate(appt._id, update)
    i++
  }

  const completed = await appointmentModel.countDocuments({ isCompleted: true })
  const cancelled = await appointmentModel.countDocuments({ cancelled: true })
  const upcoming = await appointmentModel.countDocuments({ isCompleted: false, cancelled: false })

  console.log(`✓ Completed: ${completed}`)
  console.log(`✓ Upcoming:  ${upcoming}`)
  console.log(`✓ Cancelled: ${cancelled}`)
  console.log('\nDone!')
  process.exit(0)
}

fix().catch(e => { console.error(e.message); process.exit(1) })
