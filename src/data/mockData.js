// Mock Data Store for CampusConnect Platform

export const initialStudents = [
  {
    id: "std-001",
    name: "Alex Johnson",
    email: "alex.johnson@campus.edu",
    collegeId: "CS2023-042",
    department: "Computer Science & Engineering",
    semester: "6th Semester",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    phone: "+1 (555) 234-5678",
    bio: "Passionate open-source enthusiast and campus tech club coordinator.",
    joinedYear: "2023"
  },
  {
    id: "std-002",
    name: "Sophia Martinez",
    email: "sophia.m@campus.edu",
    collegeId: "EC2022-119",
    department: "Electronics & Communication",
    semester: "8th Semester",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    phone: "+1 (555) 789-0123",
    bio: "Robotics geek, IEEE student branch chair.",
    joinedYear: "2022"
  },
  {
    id: "std-003",
    name: "David Kim",
    email: "david.kim@campus.edu",
    collegeId: "ME2024-008",
    department: "Mechanical Engineering",
    semester: "4th Semester",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    phone: "+1 (555) 456-7890",
    bio: "Formula student racing team chassis lead.",
    joinedYear: "2024"
  },
  {
    id: "std-004",
    name: "Priya Sharma",
    email: "priya.sharma@campus.edu",
    collegeId: "IT2023-088",
    department: "Information Technology",
    semester: "6th Semester",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    phone: "+1 (555) 321-6548",
    bio: "AI researcher & campus women in tech lead.",
    joinedYear: "2023"
  }
];

export const initialComplaints = [
  {
    id: "CMP-1001",
    studentId: "std-001",
    studentName: "Alex Johnson",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    department: "Computer Science & Engineering",
    title: "High-speed Wi-Fi down in Turing Lab & 3rd Floor",
    description: "The primary wireless access points in Turing Lab Room 302 have been completely disconnected since yesterday morning. Students cannot connect to lab servers or online compilers during project sessions.",
    category: "Wi-Fi & Network",
    location: "Academic Block B, Room 302 (Turing Lab)",
    status: "In Progress", // "Pending", "In Progress", "Resolved"
    priority: "High",
    createdAt: "2026-03-28 09:30 AM",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    timeline: [
      {
        status: "Pending",
        time: "Mar 28, 09:30 AM",
        note: "Complaint submitted by student."
      },
      {
        status: "In Progress",
        time: "Mar 28, 02:15 PM",
        note: "Campus IT Services dispatched a network engineer to check Cisco routers."
      }
    ],
    comments: [
      {
        id: "c-1",
        author: "Alex Johnson",
        role: "Student",
        time: "Mar 28, 09:35 AM",
        text: "Please escalate this quickly as exams start next week!"
      },
      {
        id: "c-2",
        author: "Campus IT Admin",
        role: "Admin",
        time: "Mar 28, 02:15 PM",
        text: "We detected a blown switch fuse. New equipment is being wired now."
      }
    ]
  },
  {
    id: "CMP-1002",
    studentId: "std-001",
    studentName: "Alex Johnson",
    studentAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    department: "Computer Science & Engineering",
    title: "Broken ceiling fan & faulty switches in Seminar Hall A",
    description: "The middle ceiling fan is vibrating intensely and making loud metallic noise, while two power sockets near the podium are completely non-functional.",
    category: "Electrical & Facilities",
    location: "Main Auditorium Block, Seminar Hall A",
    status: "Pending",
    priority: "Medium",
    createdAt: "2026-03-27 03:45 PM",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800",
    timeline: [
      {
        status: "Pending",
        time: "Mar 27, 03:45 PM",
        note: "Complaint submitted and awaiting assignment by Facilities Department."
      }
    ],
    comments: [
      {
        id: "c-3",
        author: "Alex Johnson",
        role: "Student",
        time: "Mar 27, 03:48 PM",
        text: "Seminar scheduled for this Thursday, request urgent attention."
      }
    ]
  },
  {
    id: "CMP-1003",
    studentId: "std-002",
    studentName: "Sophia Martinez",
    studentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    department: "Electronics & Communication",
    title: "Water cooler leak causing slippery floor near Library entrance",
    description: "The chilled water dispensing unit near the central library entrance has a severe bottom leak, causing a persistent puddle and slip hazard for visiting students.",
    category: "Sanitation & Water",
    location: "Central Library, Ground Floor East Wing",
    status: "Resolved",
    priority: "High",
    createdAt: "2026-03-25 11:20 AM",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    timeline: [
      {
        status: "Pending",
        time: "Mar 25, 11:20 AM",
        note: "Report registered by student."
      },
      {
        status: "In Progress",
        time: "Mar 25, 01:00 PM",
        note: "Plumbing team inspected valve rupture."
      },
      {
        status: "Resolved",
        time: "Mar 26, 10:15 AM",
        note: "Replaced faulty intake valve and dried floor tiles completely."
      }
    ],
    comments: [
      {
        id: "c-4",
        author: "Estate Office",
        role: "Admin",
        time: "Mar 26, 10:18 AM",
        text: "Issue resolved. Water station is now 100% operational and dry."
      }
    ]
  },
  {
    id: "CMP-1004",
    studentId: "std-003",
    studentName: "David Kim",
    studentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
    department: "Mechanical Engineering",
    title: "Damaged wooden desks and loose chairs in Lecture Hall 104",
    description: "Several wooden desks have rough splinters and broken edge strips that damage student laptops and clothing.",
    category: "Furniture & Maintenance",
    location: "Academic Block A, 1st Floor LH-104",
    status: "In Progress",
    priority: "Low",
    createdAt: "2026-03-26 04:10 PM",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800",
    timeline: [
      {
        status: "Pending",
        time: "Mar 26, 04:10 PM",
        note: "Report submitted."
      },
      {
        status: "In Progress",
        time: "Mar 27, 09:00 AM",
        note: "Carpentry unit tagged 5 damaged desks for repair."
      }
    ],
    comments: []
  },
  {
    id: "CMP-1005",
    studentId: "std-004",
    studentName: "Priya Sharma",
    studentAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    department: "Information Technology",
    title: "Dim lighting in West Hostel walkway at night",
    description: "Three solar streetlights along the pathway between Girls Hostel block and the Cafeteria are not turning on, causing safety concerns after 8 PM.",
    category: "Electrical & Facilities",
    location: "Campus Pathway between Hostel 3 and Food Court",
    status: "Pending",
    priority: "High",
    createdAt: "2026-03-28 08:15 AM",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
    timeline: [
      {
        status: "Pending",
        time: "Mar 28, 08:15 AM",
        note: "Urgent ticket queued for campus security and electrical staff."
      }
    ],
    comments: [
      {
        id: "c-5",
        author: "Campus Proctor",
        role: "Admin",
        time: "Mar 28, 09:00 AM",
        text: "Noted with priority. Temporary mobile floodlights deployed while bulbs are replaced."
      }
    ]
  }
];

export const initialEvents = [
  {
    id: "EVT-201",
    title: "HackCampus 2026: 36-Hour National Hackathon",
    category: "Hackathon",
    organizer: "Department of CSE & Google Developer Student Club",
    date: "April 18 - 19, 2026",
    time: "09:00 AM - 09:00 PM (Next Day)",
    venue: "Main Campus Convention Center & Innovation Lab",
    description: "Gather with 500+ builders across universities! Solve pressing real-world challenges in AI, Web3, GreenTech, and Smart Campus systems. Grand prize pool of $10,000 + internship interviews.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    capacity: 400,
    registeredCount: 342,
    isRegistered: true,
    tags: ["Coding", "Prizes", "Mentorship", "AI"],
    speakers: ["Dr. Evelyn Vance (Chief AI Officer)", "Rohan Mehra (Founder, DevMatrix)"],
    eligibility: "Open to all undergraduate & postgraduate students"
  },
  {
    id: "EVT-202",
    title: "Annual TechFest: RoboSoccer & Autonomous Drones",
    category: "Robotics",
    organizer: "Robotics & Automation Society",
    date: "April 24, 2026",
    time: "10:00 AM - 05:30 PM",
    venue: "Campus Indoor Sports Arena",
    description: "Witness high-octane autonomous drone obstacle navigation and fast-paced micro-robot soccer showdowns. Test your custom bots against national tournament champions.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    capacity: 250,
    registeredCount: 198,
    isRegistered: false,
    tags: ["Robotics", "Drones", "Competition"],
    speakers: ["Prof. Aris Thorne (Robotics Institute)"],
    eligibility: "All engineering students"
  },
  {
    id: "EVT-203",
    title: "AI & Future of Software Engineering Workshop",
    category: "Workshop",
    organizer: "ACM Student Chapter",
    date: "April 28, 2026",
    time: "02:00 PM - 05:00 PM",
    venue: "Seminar Hall B, CS Block",
    description: "A hands-on workshop guiding students through modern LLM agent orchestration, prompt engineering, code generation pipelines, and deploying containerized microservices.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    capacity: 120,
    registeredCount: 115,
    isRegistered: true,
    tags: ["AI", "Hands-on", "Career", "WebDev"],
    speakers: ["Elena Rostova (Senior ML Architect)"],
    eligibility: "Basic programming knowledge recommended"
  },
  {
    id: "EVT-204",
    title: "Campus Cultural Carnival: Resonance 2026",
    category: "Cultural",
    organizer: "Student Welfare & Arts Council",
    date: "May 02 - 04, 2026",
    time: "05:00 PM - 10:30 PM",
    venue: "Open Air Amphitheatre",
    description: "Three electrifying nights of live music, battle of the college bands, drama productions, food trucks, art showcases, and celebrity musical guest performances.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    capacity: 1500,
    registeredCount: 1240,
    isRegistered: false,
    tags: ["Music", "Dance", "Celebration", "Food"],
    speakers: ["Campus Band", "Celebrity DJ"],
    eligibility: "Campus ID card holders & guests"
  },
  {
    id: "EVT-205",
    title: "Career & Internship Fair 2026: Tier-1 Tech Recruiters",
    category: "Career",
    organizer: "Training & Placement Cell",
    date: "May 10, 2026",
    time: "09:30 AM - 04:30 PM",
    venue: "Central Auditorium Plaza",
    description: "Connect with over 45 prominent technology, finance, and engineering companies offering summer internships and full-time pre-placement offers.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800",
    capacity: 800,
    registeredCount: 710,
    isRegistered: false,
    tags: ["Jobs", "Internships", "Interviews", "Networking"],
    speakers: ["HR Directors from top tech firms"],
    eligibility: "3rd & 4th Year Undergraduates"
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    title: "Complaint Updated: Turing Lab Wi-Fi",
    message: "Your ticket CMP-1001 status changed to 'In Progress'. IT technician dispatched.",
    type: "complaint",
    time: "2 hours ago",
    read: false,
    link: "/complaints/CMP-1001"
  },
  {
    id: "notif-2",
    title: "HackCampus 2026 Registration Confirmed!",
    message: "You are registered for HackCampus 2026! Check your registered team details and venue guide.",
    type: "event",
    time: "Yesterday, 4:15 PM",
    read: false,
    link: "/events/EVT-201"
  },
  {
    id: "notif-3",
    title: "Complaint Resolved: Water Cooler Leak",
    message: "Ticket CMP-1003 has been marked as Resolved by the Estate Office.",
    type: "complaint",
    time: "2 days ago",
    read: true,
    link: "/complaints/CMP-1003"
  },
  {
    id: "notif-4",
    title: "Admin Notice: Semester Midterm Schedule Released",
    message: "Dean of Academic Affairs published the revised schedule for Spring 2026 midterms.",
    type: "announcement",
    time: "3 days ago",
    read: true,
    link: "#"
  }
];

export const complaintCategories = [
  "Wi-Fi & Network",
  "Electrical & Facilities",
  "Sanitation & Water",
  "Furniture & Maintenance",
  "Laboratory Equipment",
  "Cafeteria & Food Quality",
  "Library Services",
  "Hostel Accommodations",
  "Other Campus Issues"
];

