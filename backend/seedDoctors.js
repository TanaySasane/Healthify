import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dns from 'dns'
import 'dotenv/config'
import doctorModel from './models/doctorModel.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dns.setDefaultResultOrder('ipv4first')

const doctors = [
  {
    name: 'Dr. Arjun Sharma',
    email: 'arjun.sharma@healthify.in',
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '8 Years',
    about: 'Dr. Arjun Sharma is a dedicated general physician with 8 years of experience in preventive medicine, chronic disease management, and patient-centered care. He believes in holistic treatment and early diagnosis.',
    fees: 500,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'Kothrud Clinic, FC Road', line2: 'Pune, Maharashtra 411004' }
  },
  {
    name: 'Dr. Priya Desai',
    email: 'priya.desai@healthify.in',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (OBG)',
    experience: '10 Years',
    about: 'Dr. Priya Desai is a highly experienced gynecologist specializing in women\'s health, prenatal care, and minimally invasive surgeries. She is known for her compassionate approach.',
    fees: 700,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'Sahyadri Hospital, Deccan', line2: 'Pune, Maharashtra 411004' }
  },
  {
    name: 'Dr. Rahul Kulkarni',
    email: 'rahul.kulkarni@healthify.in',
    speciality: 'Dermatologist',
    degree: 'MBBS, MD (Dermatology)',
    experience: '6 Years',
    about: 'Dr. Rahul Kulkarni specializes in skin disorders, cosmetic dermatology, and hair treatments. He uses the latest techniques for acne, psoriasis, and skin rejuvenation.',
    fees: 600,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'SkinCare Centre, Baner Road', line2: 'Pune, Maharashtra 411045' }
  },
  {
    name: 'Dr. Sneha Joshi',
    email: 'sneha.joshi@healthify.in',
    speciality: 'Pediatricians',
    degree: 'MBBS, DCH',
    experience: '7 Years',
    about: 'Dr. Sneha Joshi is a caring pediatrician with expertise in child development, vaccinations, and neonatal care. She is loved by children and trusted by parents.',
    fees: 550,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'ChildCare Clinic, Karve Road', line2: 'Pune, Maharashtra 411004' }
  },
  {
    name: 'Dr. Vikram Patil',
    email: 'vikram.patil@healthify.in',
    speciality: 'Neurologist',
    degree: 'MBBS, DM (Neurology)',
    experience: '12 Years',
    about: 'Dr. Vikram Patil is a senior neurologist with expertise in epilepsy, stroke management, and neurodegenerative disorders. He has treated over 10,000 patients.',
    fees: 900,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'NeuroHealth Centre, Shivajinagar', line2: 'Pune, Maharashtra 411005' }
  },
  {
    name: 'Dr. Anita Mehta',
    email: 'anita.mehta@healthify.in',
    speciality: 'Gastroenterologist',
    degree: 'MBBS, DM (Gastroenterology)',
    experience: '9 Years',
    about: 'Dr. Anita Mehta is an expert gastroenterologist specializing in digestive disorders, liver diseases, and endoscopic procedures. She provides comprehensive GI care.',
    fees: 800,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'GastroPlus Clinic, Aundh', line2: 'Pune, Maharashtra 411007' }
  },
  {
    name: 'Dr. Rohan Bhosale',
    email: 'rohan.bhosale@healthify.in',
    speciality: 'General physician',
    degree: 'MBBS, MD',
    experience: '5 Years',
    about: 'Dr. Rohan Bhosale is a compassionate general physician focused on family medicine, diabetes management, and lifestyle diseases. He is known for his thorough consultations.',
    fees: 450,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'Wellness Clinic, Wakad', line2: 'Pune, Maharashtra 411057' }
  },
  {
    name: 'Dr. Kavita Nair',
    email: 'kavita.nair@healthify.in',
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (OBG)',
    experience: '8 Years',
    about: 'Dr. Kavita Nair specializes in high-risk pregnancies, infertility treatments, and laparoscopic surgeries. She is committed to women\'s reproductive health.',
    fees: 750,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'WomenCare Hospital, Kothrud', line2: 'Pune, Maharashtra 411038' }
  },
  {
    name: 'Dr. Suresh Iyer',
    email: 'suresh.iyer@healthify.in',
    speciality: 'Neurologist',
    degree: 'MBBS, MD, DM',
    experience: '15 Years',
    about: 'Dr. Suresh Iyer is a veteran neurologist with 15 years of experience in treating migraines, Parkinson\'s disease, and multiple sclerosis. He is a visiting consultant at top hospitals.',
    fees: 1000,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'Brain & Spine Institute, Camp', line2: 'Pune, Maharashtra 411001' }
  },
  {
    name: 'Dr. Pooja Wagh',
    email: 'pooja.wagh@healthify.in',
    speciality: 'Dermatologist',
    degree: 'MBBS, DVD',
    experience: '4 Years',
    about: 'Dr. Pooja Wagh is a young and dynamic dermatologist specializing in cosmetic procedures, anti-aging treatments, and skin allergy management.',
    fees: 500,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'GlowSkin Clinic, Viman Nagar', line2: 'Pune, Maharashtra 411014' }
  },
  {
    name: 'Dr. Amit Chavan',
    email: 'amit.chavan@healthify.in',
    speciality: 'Pediatricians',
    degree: 'MBBS, MD (Pediatrics)',
    experience: '11 Years',
    about: 'Dr. Amit Chavan is a senior pediatrician with expertise in childhood infections, growth disorders, and adolescent health. He runs a dedicated child wellness program.',
    fees: 600,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'KidsCare Hospital, Hadapsar', line2: 'Pune, Maharashtra 411028' }
  },
  {
    name: 'Dr. Meera Gokhale',
    email: 'meera.gokhale@healthify.in',
    speciality: 'Gastroenterologist',
    degree: 'MBBS, MD, DM',
    experience: '13 Years',
    about: 'Dr. Meera Gokhale is a leading gastroenterologist known for her expertise in IBD, GERD, and advanced endoscopy. She has published research in national medical journals.',
    fees: 850,
    image: 'https://res.cloudinary.com/demo/image/upload/v1/samples/people/smiling-man.jpg',
    address: { line1: 'DigestiveCare Centre, Pune Station', line2: 'Pune, Maharashtra 411001' }
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('Doctor@123', salt)

    let added = 0
    for (const doc of doctors) {
      const exists = await doctorModel.findOne({ email: doc.email })
      if (!exists) {
        await doctorModel.create({ ...doc, password: hashedPassword, available: true, date: Date.now(), slots_booked: {} })
        console.log(`✓ Added: ${doc.name}`)
        added++
      } else {
        console.log(`- Skipped (exists): ${doc.name}`)
      }
    }

    console.log(`\nDone! ${added} doctors added.`)
    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

seed()
