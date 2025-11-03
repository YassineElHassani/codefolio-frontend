const orbStyles = [
  'left-[8%] top-[-120px] h-[360px] w-[360px] bg-[radial-gradient(circle_at_center,_rgba(74,112,169,0.45)_0%,_rgba(0,0,0,0)_70%)]',
  'right-[6%] top-[220px] h-[260px] w-[260px] bg-[radial-gradient(circle_at_center,_rgba(239,236,227,0.4)_0%,_rgba(0,0,0,0)_72%)]',
  'left-1/2 top-[620px] h-[420px] w-[420px] -translate-x-1/2 bg-[radial-gradient(circle_at_center,_rgba(143,171,212,0.35)_0%,_rgba(0,0,0,0)_75%)]',
]

const BackgroundOrbs = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {orbStyles.map(style => (
        <span
          key={style}
          className={`absolute blur-3xl transition-opacity duration-700 ease-out ${style}`}
        />
      ))}
    </div>
  )
}

export default BackgroundOrbs
