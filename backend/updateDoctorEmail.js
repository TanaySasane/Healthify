import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dns from 'dns'
import 'dotenv/config'
import doctorModel from './models/doctorModel.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dns.setDefaultResultOrder('ipv4first')

const update = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  const salt = await bcrypt.genSalt(10)
  const pass = await bcrypt.hash('doctor123', salt)
  const result = await doctorModel.findOneAndUpdate(
    { email: 'arjun.sharma@healthify.in' },
    { email: 'doctor@healthify.in', password: pass }
  )
  console.log(result ? '✓ Updated: doctor@healthify.in / doctor123' : '✗ Not found')
  process.exit(0)
}

update().catch(e => { console.error(e.message); process.exit(1) })
