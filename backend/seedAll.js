import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import dns from 'dns'
import 'dotenv/config'
import doctorModel from './models/doctorModel.js'
import userModel from './models/userModel.js'
import appointmentModel from './models/appointmentModel.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dns.setDefaultResultOrder('ipv4first')

// Simple avatar URLs - different for male/female
const maleAvatar = 'https://api.dicebear.com/7.x/personas/svg?seed=male&backgroundColor=b6e3f4'
const femaleAvatar = 'https://api.dicebear.com/7.x/personas/svg?seed=female&backgroundColor=ffdfbf'

const maleAvatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram&backgroundColor=d1f4d1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Nikhil&backgroundColor=d1f4d1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh&backgroundColor=ffd5dc',
]

const femaleAvatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha&backgroundColor=ffd5dc',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Anita&backgroundColor=b6e3f4',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita&backgroundColor=c0aede',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja&backgroundColor=d1f4d1',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera&backgroundColor=ffdfbf',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita&backgroundColor=ffd5dc',
]

const doctors = [
  { name: 'Dr. Arjun Sharma', email: 'arjun.sharma@healthify.in', speciality: 'General physician', degree: 'MBBS, MD', experience: '8 Years', fees: 500, image: maleAvatars[0], address: { line1: 'FC Road, Kothrud', line2: 'Pune, Maharashtra 411004' }, about: 'Dr. Arjun Sharma is a dedicated general physician with 8 years of experience in preventive medicine and chronic disease management.' },
  { name: 'Dr. Priya Desai', email: 'priya.desai@healthify.in', speciality: 'Gynecologist', degree: 'MBBS, MS (OBG)', experience: '10 Years', fees: 700, image: femaleAvatars[0], address: { line1: 'Sahyadri Hospital, Deccan', line2: 'Pune, Maharashtra 411004' }, about: 'Dr. Priya Desai is a highly experienced gynecologist specializing in women\'s health and prenatal care.' },
  { name: 'Dr. Rahul Kulkarni', email: 'rahul.kulkarni@healthify.in', speciality: 'Dermatologist', degree: 'MBBS, MD (Dermatology)', experience: '6 Years', fees: 600, image: maleAvatars[1], address: { line1: 'Baner Road, SkinCare Centre', line2: 'Pune, Maharashtra 411045' }, about: 'Dr. Rahul Kulkarni specializes in skin disorders, cosmetic dermatology, and hair treatments.' },
  { name: 'Dr. Sneha Joshi', email: 'sneha.joshi@healthify.in', speciality: 'Pediatricians', degree: 'MBBS, DCH', experience: '7 Years', fees: 550, image: femaleAvatars[1], address: { line1: 'Karve Road, ChildCare Clinic', line2: 'Pune, Maharashtra 411004' }, about: 'Dr. Sneha Joshi is a caring pediatrician with expertise in child development and vaccinations.' },
  { name: 'Dr. Vikram Patil', email: 'vikram.patil@healthify.in', speciality: 'Neurologist', degree: 'MBBS, DM (Neurology)', experience: '12 Years', fees: 900, image: maleAvatars[2], address: { line1: 'Shivajinagar, NeuroHealth Centre', line2: 'Pune, Maharashtra 411005' }, about: 'Dr. Vikram Patil is a senior neurologist with expertise in epilepsy and stroke management.' },
  { name: 'Dr. Anita Mehta', email: 'anita.mehta@healthify.in', speciality: 'Gastroenterologist', degree: 'MBBS, DM (Gastroenterology)', experience: '9 Years', fees: 800, image: femaleAvatars[2], address: { line1: 'Aundh, GastroPlus Clinic', line2: 'Pune, Maharashtra 411007' }, about: 'Dr. Anita Mehta is an expert gastroenterologist specializing in digestive disorders and liver diseases.' },
  { name: 'Dr. Rohan Bhosale', email: 'rohan.bhosale@healthify.in', speciality: 'General physician', degree: 'MBBS, MD', experience: '5 Years', fees: 450, image: maleAvatars[3], address: { line1: 'Wakad, Wellness Clinic', line2: 'Pune, Maharashtra 411057' }, about: 'Dr. Rohan Bhosale is a compassionate general physician focused on family medicine and diabetes management.' },
  { name: 'Dr. Kavita Nair', email: 'kavita.nair@healthify.in', speciality: 'Gynecologist', degree: 'MBBS, MS (OBG)', experience: '8 Years', fees: 750, image: femaleAvatars[3], address: { line1: 'Kothrud, WomenCare Hospital', line2: 'Pune, Maharashtra 411038' }, about: 'Dr. Kavita Nair specializes in high-risk pregnancies and infertility treatments.' },
  { name: 'Dr. Suresh Iyer', email: 'suresh.iyer@healthify.in', speciality: 'Neurologist', degree: 'MBBS, MD, DM', experience: '15 Years', fees: 1000, image: maleAvatars[4], address: { line1: 'Camp, Brain & Spine Institute', line2: 'Pune, Maharashtra 411001' }, about: 'Dr. Suresh Iyer is a veteran neurologist with 15 years of experience treating migraines and Parkinson\'s disease.' },
  { name: 'Dr. Pooja Wagh', email: 'pooja.wagh@healthify.in', speciality: 'Dermatologist', degree: 'MBBS, DVD', experience: '4 Years', fees: 500, image: femaleAvatars[4], address: { line1: 'Viman Nagar, GlowSkin Clinic', line2: 'Pune, Maharashtra 411014' }, about: 'Dr. Pooja Wagh specializes in cosmetic procedures and anti-aging treatments.' },
  { name: 'Dr. Amit Chavan', email: 'amit.chavan@healthify.in', speciality: 'Pediatricians', degree: 'MBBS, MD (Pediatrics)', experience: '11 Years', fees: 600, image: maleAvatars[5], address: { line1: 'Hadapsar, KidsCare Hospital', line2: 'Pune, Maharashtra 411028' }, about: 'Dr. Amit Chavan is a senior pediatrician with expertise in childhood infections and growth disorders.' },
  { name: 'Dr. Meera Gokhale', email: 'meera.gokhale@healthify.in', speciality: 'Gastroenterologist', degree: 'MBBS, MD, DM', experience: '13 Years', fees: 850, image: femaleAvatars[5], address: { line1: 'Pune Station, DigestiveCare Centre', line2: 'Pune, Maharashtra 411001' }, about: 'Dr. Meera Gokhale is a leading gastroenterologist known for her expertise in IBD and advanced endoscopy.' },
  { name: 'Dr. Nikhil Deshpande', email: 'nikhil.deshpande@healthify.in', speciality: 'General physician', degree: 'MBBS, MD', experience: '3 Years', fees: 400, image: maleAvatars[6], address: { line1: 'Hinjewadi, MediCare Clinic', line2: 'Pune, Maharashtra 411057' }, about: 'Dr. Nikhil Deshpande is a young and energetic physician focused on preventive healthcare and lifestyle medicine.' },
  { name: 'Dr. Sunita Rao', email: 'sunita.rao@healthify.in', speciality: 'Dermatologist', degree: 'MBBS, MD (Skin)', experience: '9 Years', fees: 650, image: femaleAvatars[6], address: { line1: 'Koregaon Park, DermaCare', line2: 'Pune, Maharashtra 411001' }, about: 'Dr. Sunita Rao is an experienced dermatologist specializing in skin allergies, eczema, and cosmetic treatments.' },
  { name: 'Dr. Rajesh Pawar', email: 'rajesh.pawar@healthify.in', speciality: 'Neurologist', degree: 'MBBS, DM', experience: '7 Years', fees: 850, image: maleAvatars[7], address: { line1: 'Pimpri, NeuroPlus Hospital', line2: 'Pune, Maharashtra 411018' }, about: 'Dr. Rajesh Pawar specializes in headache disorders, dementia, and spinal cord diseases.' },
  { name: 'Dr. Deepa Kulkarni', email: 'deepa.kulkarni@healthify.in', speciality: 'Gynecologist', degree: 'MBBS, MS, DNB', experience: '14 Years', fees: 900, image: femaleAvatars[0], address: { line1: 'Sadashiv Peth, WomensHealth Clinic', line2: 'Pune, Maharashtra 411030' }, about: 'Dr. Deepa Kulkarni is a senior gynecologist with 14 years of experience in obstetrics and reproductive medicine.' },
  { name: 'Dr. Sanjay Gaikwad', email: 'sanjay.gaikwad@healthify.in', speciality: 'Gastroenterologist', degree: 'MBBS, MD, DM', experience: '10 Years', fees: 780, image: maleAvatars[0], address: { line1: 'Bibwewadi, GutHealth Centre', line2: 'Pune, Maharashtra 411037' }, about: 'Dr. Sanjay Gaikwad is a skilled gastroenterologist with expertise in colonoscopy and hepatology.' },
  { name: 'Dr. Ritu Sharma', email: 'ritu.sharma@healthify.in', speciality: 'Pediatricians', degree: 'MBBS, MD (Pediatrics)', experience: '6 Years', fees: 520, image: femaleAvatars[1], address: { line1: 'Katraj, BabyFirst Clinic', line2: 'Pune, Maharashtra 411046' }, about: 'Dr. Ritu Sharma is a dedicated pediatrician passionate about child nutrition and developmental milestones.' },
  { name: 'Dr. Kiran Joshi', email: 'kiran.joshi@healthify.in', speciality: 'General physician', degree: 'MBBS, MD', experience: '6 Years', fees: 480, image: maleAvatars[1], address: { line1: 'Pimple Saudagar, HealthFirst', line2: 'Pune, Maharashtra 411027' }, about: 'Dr. Kiran Joshi is a trusted general physician known for his patient-friendly approach and thorough diagnosis.' },
  { name: 'Dr. Swati Bhatt', email: 'swati.bhatt@healthify.in', speciality: 'Gynecologist', degree: 'MBBS, MS (OBG)', experience: '5 Years', fees: 650, image: femaleAvatars[2], address: { line1: 'Warje, MothersTouch Clinic', line2: 'Pune, Maharashtra 411058' }, about: 'Dr. Swati Bhatt is a compassionate gynecologist focused on maternal health and safe deliveries.' },
  { name: 'Dr. Prasad Kulkarni', email: 'prasad.kulkarni@healthify.in', speciality: 'Gastroenterologist', degree: 'MBBS, DM', experience: '8 Years', fees: 720, image: maleAvatars[2], address: { line1: 'Kharadi, GutCare Centre', line2: 'Pune, Maharashtra 411014' }, about: 'Dr. Prasad Kulkarni specializes in liver disorders, IBS, and advanced endoscopic procedures.' },
  { name: 'Dr. Nandini Deshmukh', email: 'nandini.deshmukh@healthify.in', speciality: 'Neurologist', degree: 'MBBS, DM (Neurology)', experience: '9 Years', fees: 950, image: femaleAvatars[3], address: { line1: 'Erandwane, BrainCare Hospital', line2: 'Pune, Maharashtra 411004' }, about: 'Dr. Nandini Deshmukh is an expert in treating anxiety disorders, sleep disorders, and neuropathy.' },
  { name: 'Dr. Tejas More', email: 'tejas.more@healthify.in', speciality: 'Dermatologist', degree: 'MBBS, MD (Dermatology)', experience: '5 Years', fees: 580, image: maleAvatars[3], address: { line1: 'Kondhwa, SkinFirst Clinic', line2: 'Pune, Maharashtra 411048' }, about: 'Dr. Tejas More specializes in acne treatment, vitiligo, and laser skin procedures.' },
]

const users = [
  { name: 'Aarav Mehta', email: 'aarav.mehta@gmail.com', phone: '9876543210', gender: 'Male', dob: '1990-05-15', address: { line1: 'Flat 12, Shivaji Nagar', line2: 'Pune 411005' } },
  { name: 'Prachi Joshi', email: 'prachi.joshi@gmail.com', phone: '9823456789', gender: 'Female', dob: '1995-08-22', address: { line1: '45 Kothrud Colony', line2: 'Pune 411038' } },
  { name: 'Rohit Desai', email: 'rohit.desai@gmail.com', phone: '9765432109', gender: 'Male', dob: '1988-03-10', address: { line1: 'B-7 Aundh Road', line2: 'Pune 411007' } },
  { name: 'Neha Patil', email: 'neha.patil@gmail.com', phone: '9654321098', gender: 'Female', dob: '1993-11-30', address: { line1: '23 Baner Road', line2: 'Pune 411045' } },
  { name: 'Siddharth Kulkarni', email: 'siddharth.k@gmail.com', phone: '9543210987', gender: 'Male', dob: '1985-07-18', address: { line1: 'Wakad, Phase 2', line2: 'Pune 411057' } },
  { name: 'Anjali Sharma', email: 'anjali.sharma@gmail.com', phone: '9432109876', gender: 'Female', dob: '1998-02-14', address: { line1: 'Viman Nagar, Apt 5', line2: 'Pune 411014' } },
  { name: 'Karan Bhosale', email: 'karan.bhosale@gmail.com', phone: '9321098765', gender: 'Male', dob: '1992-09-25', address: { line1: 'Hadapsar Main Road', line2: 'Pune 411028' } },
  { name: 'Shruti Nair', email: 'shruti.nair@gmail.com', phone: '9210987654', gender: 'Female', dob: '1996-04-08', address: { line1: 'Koregaon Park Lane 3', line2: 'Pune 411001' } },
  { name: 'Vivek Iyer', email: 'vivek.iyer@gmail.com', phone: '9109876543', gender: 'Male', dob: '1987-12-20', address: { line1: 'Camp Area, MG Road', line2: 'Pune 411001' } },
  { name: 'Pooja Wagh', email: 'pooja.wagh.user@gmail.com', phone: '9098765432', gender: 'Female', dob: '1994-06-12', address: { line1: 'Pimpri Colony', line2: 'Pune 411018' } },
  { name: 'Tanay Sasane', email: 'tanaysasane@gmail.com', phone: '9322774275', gender: 'Male', dob: '2000-01-01', address: { line1: 'Kothrud, Nal Stop', line2: 'Pune, Maharashtra 411004' } },
  { name: 'Riya Chavan', email: 'riya.chavan@gmail.com', phone: '8987654321', gender: 'Female', dob: '1997-03-17', address: { line1: 'Deccan Gymkhana', line2: 'Pune 411004' } },
  { name: 'Aditya Gaikwad', email: 'aditya.gaikwad@gmail.com', phone: '8876543210', gender: 'Male', dob: '1991-10-05', address: { line1: 'Katraj, Sinhagad Road', line2: 'Pune 411046' } },
  { name: 'Meghna Rao', email: 'meghna.rao@gmail.com', phone: '8765432109', gender: 'Female', dob: '1999-07-28', address: { line1: 'Bibwewadi, Near Market', line2: 'Pune 411037' } },
  { name: 'Harsh Pawar', email: 'harsh.pawar@gmail.com', phone: '8654321098', gender: 'Male', dob: '1986-01-15', address: { line1: 'Hinjewadi IT Park Road', line2: 'Pune 411057' } },
  { name: 'Gaurav Shinde', email: 'gaurav.shinde@gmail.com', phone: '8543210987', gender: 'Male', dob: '1993-08-11', address: { line1: 'Warje, Near Bridge', line2: 'Pune 411058' } },
  { name: 'Pallavi Jain', email: 'pallavi.jain@gmail.com', phone: '8432109876', gender: 'Female', dob: '1997-05-23', address: { line1: 'Pimple Saudagar, Sector 7', line2: 'Pune 411027' } },
  { name: 'Omkar Kulkarni', email: 'omkar.kulkarni@gmail.com', phone: '8321098765', gender: 'Male', dob: '1989-12-03', address: { line1: 'Kharadi, IT Hub Road', line2: 'Pune 411014' } },
  { name: 'Sakshi Deshmukh', email: 'sakshi.deshmukh@gmail.com', phone: '8210987654', gender: 'Female', dob: '2001-02-28', address: { line1: 'Erandwane, FC Road', line2: 'Pune 411004' } },
  { name: 'Yash Parab', email: 'yash.parab@gmail.com', phone: '8109876543', gender: 'Male', dob: '1995-09-14', address: { line1: 'Kondhwa, Main Road', line2: 'Pune 411048' } },
  { name: 'Ishita Mehta', email: 'ishita.mehta@gmail.com', phone: '7998765432', gender: 'Female', dob: '1998-07-07', address: { line1: 'Bibwewadi, Lane 4', line2: 'Pune 411037' } },
  { name: 'Nitin Sawant', email: 'nitin.sawant@gmail.com', phone: '7887654321', gender: 'Male', dob: '1984-04-19', address: { line1: 'Hadapsar, Magarpatta Road', line2: 'Pune 411028' } },
  { name: 'Divya Nair', email: 'divya.nair@gmail.com', phone: '7776543210', gender: 'Female', dob: '1996-11-25', address: { line1: 'Viman Nagar, Clover Park', line2: 'Pune 411014' } },
  { name: 'Akash Tiwari', email: 'akash.tiwari@gmail.com', phone: '7665432109', gender: 'Male', dob: '1990-06-30', address: { line1: 'Shivajinagar, Law College Road', line2: 'Pune 411005' } },
]

const slotTimes = ['09:00 am', '09:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am', '02:00 pm', '02:30 pm', '03:00 pm', '03:30 pm', '04:00 pm', '04:30 pm']

const getSlotDate = (daysAgo) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  return `${d.getDate()}_${d.getMonth() + 1}_${d.getFullYear()}`
}

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB\n')

    const salt = await bcrypt.genSalt(10)
    const docPassword = await bcrypt.hash('Doctor@123', salt)
    const userPassword = await bcrypt.hash('User@123', salt)

    // Seed doctors
    console.log('--- Seeding Doctors ---')
    const doctorDocs = []
    for (const doc of doctors) {
      let existing = await doctorModel.findOne({ email: doc.email })
      if (!existing) {
        existing = await doctorModel.create({ ...doc, password: docPassword, available: true, date: Date.now(), slots_booked: {} })
        console.log(`✓ Added doctor: ${doc.name}`)
      } else {
        console.log(`- Skipped doctor: ${doc.name}`)
      }
      doctorDocs.push(existing)
    }

    // Seed users
    console.log('\n--- Seeding Users ---')
    const userDocs = []
    for (const user of users) {
      let existing = await userModel.findOne({ email: user.email })
      if (!existing) {
        existing = await userModel.create({ ...user, password: userPassword })
        console.log(`✓ Added user: ${user.name}`)
      } else {
        console.log(`- Skipped user: ${user.name}`)
      }
      userDocs.push(existing)
    }

    // Seed appointments
    console.log('\n--- Seeding Appointments ---')
    let apptCount = 0
    const statuses = [
      { cancelled: false, payment: true, isCompleted: true },
      { cancelled: false, payment: true, isCompleted: false },
      { cancelled: false, payment: false, isCompleted: false },
      { cancelled: false, payment: true, isCompleted: true },
      { cancelled: false, payment: true, isCompleted: false },
      { cancelled: false, payment: false, isCompleted: false },
      { cancelled: false, payment: true, isCompleted: true },
      { cancelled: false, payment: false, isCompleted: false },
      { cancelled: false, payment: true, isCompleted: false },
      { cancelled: true, payment: false, isCompleted: false },
    ]

    for (let i = 0; i < 40; i++) {
      const user = userDocs[i % userDocs.length]
      const doc = doctorDocs[i % doctorDocs.length]
      const status = statuses[i % statuses.length]
      const slotDate = getSlotDate(i % 30)
      const slotTime = slotTimes[i % slotTimes.length]

      const exists = await appointmentModel.findOne({
        userId: user._id.toString(),
        docId: doc._id.toString(),
        slotDate,
        slotTime
      })

      if (!exists) {
        await appointmentModel.create({
          userId: user._id.toString(),
          docId: doc._id.toString(),
          slotDate,
          slotTime,
          userData: { name: user.name, email: user.email, phone: user.phone, gender: user.gender, dob: user.dob, address: user.address, image: '' },
          docData: { name: doc.name, email: doc.email, speciality: doc.speciality, degree: doc.degree, experience: doc.experience, fees: doc.fees, image: doc.image, address: doc.address },
          amount: doc.fees,
          date: Date.now() - (i * 86400000),
          ...status
        })
        apptCount++
      }
    }
    console.log(`✓ Added ${apptCount} appointments`)

    console.log('\n✅ Seeding complete!')
    console.log(`   Doctors: ${doctorDocs.length}`)
    console.log(`   Users: ${userDocs.length}`)
    console.log(`   Appointments: ${apptCount}`)
    process.exit(0)
  } catch (err) {
    console.error('Error:', err.message)
    process.exit(1)
  }
}

seed()
