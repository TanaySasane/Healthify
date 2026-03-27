import mongoose from 'mongoose'
import dns from 'dns'
import 'dotenv/config'
import doctorModel from './models/doctorModel.js'

dns.setServers(['8.8.8.8', '8.8.4.4'])
dns.setDefaultResultOrder('ipv4first')

// Nice smiley face avatars - unique per doctor, gender appropriate
const doctorImages = {
  'Dr. Arjun Sharma':     'https://api.dicebear.com/7.x/lorelei/svg?seed=ArjunSharma&backgroundColor=b6e3f4&radius=50',
  'Dr. Priya Desai':      'https://api.dicebear.com/7.x/lorelei/svg?seed=PriyaDesai&backgroundColor=ffdfbf&radius=50',
  'Dr. Rahul Kulkarni':   'https://api.dicebear.com/7.x/lorelei/svg?seed=RahulKulkarni&backgroundColor=c0aede&radius=50',
  'Dr. Sneha Joshi':      'https://api.dicebear.com/7.x/lorelei/svg?seed=SnehaJoshi&backgroundColor=ffd5dc&radius=50',
  'Dr. Vikram Patil':     'https://api.dicebear.com/7.x/lorelei/svg?seed=VikramPatil&backgroundColor=d1f4d1&radius=50',
  'Dr. Anita Mehta':      'https://api.dicebear.com/7.x/lorelei/svg?seed=AnitaMehta&backgroundColor=ffeaa7&radius=50',
  'Dr. Rohan Bhosale':    'https://api.dicebear.com/7.x/lorelei/svg?seed=RohanBhosale&backgroundColor=b6e3f4&radius=50',
  'Dr. Kavita Nair':      'https://api.dicebear.com/7.x/lorelei/svg?seed=KavitaNair&backgroundColor=ffdfbf&radius=50',
  'Dr. Suresh Iyer':      'https://api.dicebear.com/7.x/lorelei/svg?seed=SureshIyer&backgroundColor=c0aede&radius=50',
  'Dr. Pooja Wagh':       'https://api.dicebear.com/7.x/lorelei/svg?seed=PoojaWagh&backgroundColor=ffd5dc&radius=50',
  'Dr. Amit Chavan':      'https://api.dicebear.com/7.x/lorelei/svg?seed=AmitChavan&backgroundColor=d1f4d1&radius=50',
  'Dr. Meera Gokhale':    'https://api.dicebear.com/7.x/lorelei/svg?seed=MeeraGokhale&backgroundColor=ffeaa7&radius=50',
  'Dr. Nikhil Deshpande': 'https://api.dicebear.com/7.x/lorelei/svg?seed=NikhilDeshpande&backgroundColor=b6e3f4&radius=50',
  'Dr. Sunita Rao':       'https://api.dicebear.com/7.x/lorelei/svg?seed=SunitaRao&backgroundColor=ffdfbf&radius=50',
  'Dr. Rajesh Pawar':     'https://api.dicebear.com/7.x/lorelei/svg?seed=RajeshPawar&backgroundColor=c0aede&radius=50',
  'Dr. Deepa Kulkarni':   'https://api.dicebear.com/7.x/lorelei/svg?seed=DeepaKulkarni&backgroundColor=ffd5dc&radius=50',
  'Dr. Sanjay Gaikwad':   'https://api.dicebear.com/7.x/lorelei/svg?seed=SanjayGaikwad&backgroundColor=d1f4d1&radius=50',
  'Dr. Ritu Sharma':      'https://api.dicebear.com/7.x/lorelei/svg?seed=RituSharma&backgroundColor=ffeaa7&radius=50',
  'Dr. Kiran Joshi':      'https://api.dicebear.com/7.x/lorelei/svg?seed=KiranJoshi&backgroundColor=b6e3f4&radius=50',
  'Dr. Swati Bhatt':      'https://api.dicebear.com/7.x/lorelei/svg?seed=SwatiBhatt&backgroundColor=ffd5dc&radius=50',
  'Dr. Prasad Kulkarni':  'https://api.dicebear.com/7.x/lorelei/svg?seed=PrasadKulkarni&backgroundColor=d1f4d1&radius=50',
  'Dr. Nandini Deshmukh': 'https://api.dicebear.com/7.x/lorelei/svg?seed=NandiniDeshmukh&backgroundColor=ffdfbf&radius=50',
  'Dr. Tejas More':       'https://api.dicebear.com/7.x/lorelei/svg?seed=TejasMore&backgroundColor=c0aede&radius=50',
}

const update = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected\n')

  for (const [name, image] of Object.entries(doctorImages)) {
    const result = await doctorModel.updateOne({ name }, { $set: { image } })
    if (result.modifiedCount > 0) console.log(`✓ Updated: ${name}`)
    else console.log(`- Not found: ${name}`)
  }

  console.log('\nDone!')
  process.exit(0)
}

update().catch(e => { console.error(e.message); process.exit(1) })
