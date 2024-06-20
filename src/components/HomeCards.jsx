import React from 'react'
import Card from './Card'

const HomeCards = () => {
    return (
        <section class="py-4">
            <div class="container-xl lg:container m-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                    <Card title="For Candidates" subtitle="Browse our react jobs and start your career today" btntext="Browse Jobs" btnroute='/auth/signup' usertype="candidate" />
                    <Card background="bg-indigo-100" title="For Companies" subtitle="List your job to find the perfect cadidate" btncolor="bg-indigo-500" btntext="Add New Jobs" btnroute='/auth/signup' usertype="company" />
                </div>
            </div>
        </section>
    )
}

export default HomeCards