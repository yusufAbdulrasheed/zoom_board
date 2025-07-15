"use client"
import Link from 'next/link'
import { Button } from './ui/button'
import { SparklesIcon } from 'lucide-react'
import { useUserRole } from '../hooks/useUserRole'


function DashboardBtn() {
    const { isCandidate, isLoading } = useUserRole()

    if(isCandidate || isLoading) return null
    
  return (
    <Link href={"/dashboard"}>
        <Button className="gap-2 font-medium bg-gradient-to-r from-indigo-600 to-rose-500" size={"sm"}>
      <SparklesIcon className="size-4" />
        <span>Dashboard</span>

        </Button>
    
    </Link>
  )
}

export default DashboardBtn