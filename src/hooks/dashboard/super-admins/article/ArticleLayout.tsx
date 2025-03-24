import React from 'react'

export default function ArticleLayout() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8 transition-all duration-300 hover:shadow-md border border-slate-100 backdrop-blur-sm bg-white/80">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2'>
                            Article Content
                        </h1>
                        <p className='text-slate-500 text-sm sm:text-base'>View and manage article</p>
                    </div>

                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl 
                        hover:bg-slate-700 transition-all duration-300 shadow-sm hover:scale-105">
                        Create Article
                    </button>
                </div>
            </div>
        </section>
    )
}
