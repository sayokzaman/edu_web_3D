import { useNavigate } from 'react-router'

const LandingPage = () => {
    const navigate = useNavigate()

    const projects = [
        {
            id: 1,
            title: 'Solar System',
            description: 'Explore our 3D solar system model',
            path: '/solar-system',
            image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&auto=format&fit=crop&q=60'
        },
        {
            id: 2,
            title: 'Scale',
            description: 'Interactive weight scale simulation',
            path: '/scales',
            image: 'https://unsplash.com/photos/gold-and-silver-round-frame-magnifying-glass-j06gLuKK0GM'
        }
    ]

    return (
        <div className='min-h-screen bg-zinc-950/80 text-white'>
            <video src='./src/assets/landing.mp4' autoPlay loop muted className='w-full h-auto rounded-xl fixed top-0 left-0 z-[-1]' />

            {/* Header */}
            <header className='py-20 px-6 text-center pt-72'>
                <h1 className='text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-white animate-fade-up motion-reduce:animate-none'>
                    Learn in <span className='bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent gradient-shimmer'>3D</span> with EduWeb3D
                </h1>
                <p className='text-xl md:text-2xl text-gray-400 font-light animate-fade-up-delayed motion-reduce:animate-none'>Interactive 3D Educational Experiences</p>
            </header>

            {/* Projects Grid */}
            <main className='max-w-7xl mx-auto px-6 pb-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {projects.map(project => (
                        <div
                            key={project.id}
                            onClick={() => navigate(project.path)}
                            className='group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 bg-zinc-900 border border-zinc-800 hover:border-cyan-500/50 aspect-square'
                        >
                            <div className='aspect-square relative'>
                                <img src={project.image} alt={project.title} className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-70 group-hover:opacity-90' />
                                <div className='absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent' />
                                <div className='absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-colors duration-300' />
                            </div>
                            <div className='absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300 group-hover:translate-y-0'>
                                <h3 className='text-2xl font-bold mb-2 text-white'>{project.title}</h3>
                                <p className='text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>{project.description}</p>
                            </div>
                        </div>
                    ))}

                    {/* Empty grid items with coming soon */}
                    {[...Array(7)].map((_, index) => (
                        <div key={`empty-${index}`} className='group relative overflow-hidden rounded-xl bg-zinc-900 border-2 border-dashed border-zinc-800 flex items-center justify-center hover:border-zinc-700 transition-colors duration-300 aspect-square'>
                            <div className='text-center'>
                                <div className='text-4xl mb-2 opacity-20'>🚀</div>
                                <p className='text-gray-600 font-medium'>Coming Soon</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* More Coming Soon Section */}
                <div className='mt-16 text-center'>
                    <div className='inline-block relative'>
                        <p className='text-2xl md:text-3xl font-light text-gray-600 tracking-wider'>more coming soon...</p>
                        <div className='absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full animate-pulse' />
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className='text-center py-8 text-gray-700 text-sm border-t border-zinc-900 bg-zinc-950/80'>
                <p>© 2026 edu web 3D - Interactive Learning Platform</p>
            </footer>
        </div>
    )
}

export default LandingPage
