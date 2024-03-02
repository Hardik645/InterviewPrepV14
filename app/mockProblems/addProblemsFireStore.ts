import { firestore } from "@/app/firebase/firebase"
import { problemsDB } from "@/app/mockProblems/problems2"
import { doc, setDoc } from "firebase/firestore"
export function run(){
    problemsDB.map(async(problem)=>{
    const docRef = doc(firestore, "problems",problem["id"].toString());
    console.log(problem["id"])
    await setDoc(docRef, problem);
    })
}