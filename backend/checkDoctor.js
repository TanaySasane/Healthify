import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dns from 'dns'
import 'dotenv/config'
import doctorModel from './models/doctorModel.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dns.setDefaultResultOrder('ipv4first')

const check = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  
  // Find first doctor and update email + password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash('doctor123', salt)
  
  const doc = await doctorModel.findOneAndUpdate(
    {},
    { email: 'doctor@healthify.in', password: hash },
    { new: true }
  )
  
  if (doc) {
    console.log(`✓ Updated: ${doc.name}`)
    console.log(`  Email: doctor@healthify.in`)
    console.log(`  Password: doctor123`)
  } else {
    console.log('No doctors found')
  }
  process.exit(0)
}

check().catch(e => { console.error(e.message); process.exit(1) })
