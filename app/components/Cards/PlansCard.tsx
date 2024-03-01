
type props={
    title:string,
    titleDescription:string,
    prices:number[],
    details:string[]
}
function PlansCard({plan}:{plan:props}) {
  return (
    <div className="flex flex-col items-center text-white p-3 gap-2 bg-[#393E46] rounded-3xl hover:cursor-pointer hover:scale-110 transition duration-500 object-cover">
        <h1 className="font-bold text-3xl text-center pt-2">{plan.title}</h1>
        <p className="font-thin text-center">{plan.titleDescription}</p>
        <p className="flex flex-col text-center py-2">Monthly: <strong className="text-4xl">₹{plan.prices[0]}/mo</strong></p>
        <p className="flex flex-col text-center py-2">Yearly: <strong className="text-4xl">₹{plan.prices[1]}/mo</strong></p>
        <div className="text-center">
        <strong className="font-semibold">Features:</strong>
            {plan.details.map((detail,i)=>{
                return <p key={i}>&#x2714; {detail}</p>
            })}
        </div>
        <button className="text-2xl font-bold p-2 m-3 border rounded-3xl text-center pb-3 btn-hover color-1">Subscribe</button>
    </div>
  )
}

export default PlansCard
