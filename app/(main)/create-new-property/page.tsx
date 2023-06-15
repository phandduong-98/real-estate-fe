"use client"

import CreateNewPropertyForm from "@/app/(main)/_components/CreateNewPropertyForm"

export default async function CreateNewPropertyPage() {
  return (
    <section className="container flex items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex w-screen flex-col items-center gap-2">
        <CreateNewPropertyForm />
      </div>
    </section>
  )
}
