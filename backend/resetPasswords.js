import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dns from 'dns'
import 'dotenv/config'
import doctorModel from './models/doctorModel.js'
import userModel from './models/userModel.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dns.setDefaultResultOrder('ipv4first')

const reset = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected\n')

  const salt = await bcrypt.genSalt(10)
  const docPass = await bcrypt.hash('doctor123', salt)
  const userPass = await bcrypt.hash('user123', salt)

  const d = await doctorModel.updateMany({}, { $set: { password: docPass } })
  console.log(`✓ Updated ${d.modifiedCount} doctor passwords → doctor123`)

  const u = await userModel.updateMany({}, { $set: { password: userPass } })
  console.log(`✓ Updated ${u.modifiedCount} patient passwords → user123`)

  console.log('\nAll passwords updated!')
  process.exit(0)
}

reset().catch(e => { console.error(e.message); process.exit(1) })
