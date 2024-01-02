import './LoadingScreen.css'

export function LoadingScreen () {
  return (
    <div className='container'>
      <header>
        <div className="pkl-logo">
          <img src="../../assets/LogoDex.png" alt="A Pokeball image" />
          <h1>SusyDex</h1>
        </div>
      </header>
      <section className='pkl-container'>
        <div className='pkl-loader'>
          <div className='pkl-loader-inner'>
            <div className='pkl-loader-line-wrap'>
              <div className='pkl-loader-line'></div>
            </div>
            <div className='pkl-loader-line-wrap'>
              <div className='pkl-loader-line'></div>
            </div>
            <div className='pkl-loader-line-wrap'>
              <div className='pkl-loader-line'></div>
            </div>
            <div className='pkl-loader-line-wrap'>
              <div className='pkl-loader-line'></div>
            </div>
            <div className='pkl-loader-line-wrap'>
              <div className='pkl-loader-line'></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
