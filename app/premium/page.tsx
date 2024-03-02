import PlansCard from "../components/Cards/PlansCard";
import Topbar from "../components/Topbar/Topbar";

function index() {
    type plans={
        title:string,
        titleDescription:string,
        prices:number[],
        details:string[]
    }[];
    const Plans:plans=[
        {
            title:"Basic🌱",
            titleDescription:"Entry-level subscription for beginners starting their journey.",
            prices:[350,250],
            details:["Ads-Free Browsing",
                    "Guided Paths",
                    "Contest Participation (Limited Access)"]
        },
        {
            title:"Pro🚀",
            titleDescription:"Comprehensive package for serious learners preparing for interviews.",
            prices:[450,350],
            details:["All Basic Plan Features",
                    "Job Bootcamp Courses",
                    "Upskilling Courses",
                    "Full Contest Participation",
                    "Contest Notifications",
                    "Challenges",
                    "Events"]
        },
        {
            title:"FAANG🏆",
            titleDescription:"Advanced tier for ambitious users aiming for top-tier tech companies.",
            prices:[550,450],
            details:["All Pro Plan Features",
                    "Interview Experiences",
                    "Interview Guide Bundle",
                    "Coding Interview Prep Plan",
                    "Web Development Projects & Problems",
                    "Problem of the Day",
                    "Popular Problems List",
                    "Mock Test Series",
                    "Community Access (Campus Connect, Public Discussions, Badges)"]
        },
    ]
  return (
    <div className="bg-dark-layer-2 min-h-screen">
    <Topbar/>
    <div className="text-center text-white pt-5">
        <h1 className="text-4xl font-bold p-4">Choose your right plan!</h1>
        <h4 className="text-xl p-1">Select from best plans, ensuring a perfect match. Need more or less?</h4>
        <h4 className="text-xl p-1">Customize your subscription for seamless fit!</h4>
    </div>
    <div className="flex justify-center items-center gap-10 px-5 py-5">
        {Plans.map((plan,id)=>{
            return <PlansCard key={id} plan={plan}/>
        })}
    </div>
    </div>
  )
}

export default index