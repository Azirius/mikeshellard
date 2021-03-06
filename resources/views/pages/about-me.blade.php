@extends('layouts.app')

@section('content')
    <section class="hero is-medium is-light is-bold">
        <div class="hero-body">
            <div class="container">
                <h1 class="is-1 title">
                    Hey there, I'm Mike
                </h1>
                <h1 class="subtitle" style="hsla(0, 0%, 100%, 70%) !important">
                    Welcome to my little space on the web! From time to time I'll be posting thoughts and stuff about what's happening in my life!
                    So, without further ado, here's some stuff about me. If you're interested. If not... Then don't read it?
                </h1>
            </div>
        </div>
    </section>
    <section class="section site-container">
        <div class="container container-into-hero">
            <div class="card">
                <div class="card-content">
                    <h2 class="title is-4 has-bottom-highlight">Hobbies</h2>
                    <p>
                    Just in case you wonder what makes me tick, I enjoy listening to music through a slowly growing collection of headphones.
                    <a href="/about-me/audio-gear">Click here for more information on my current gear!</a>
                    <br><br>
                    I also enjoy dabbling in web development, so, the website you see (and any of it's bugs you suffer) are my fault. The site itself is made using Laravel,
                    a favoured framework in the PHP community. I'm not a great developer by any means, but I'm keen to learn new stuff and improve what I have made previously!
                    <br><br>
                    Finally, my last hobby is gaming, which rounds off my already geeky set of pass times! I play on all three of this generations consoles (PS4 Pro, Xbox One X and Switch),
                    and used to be a part of the 'PC Master Race', however, my GPU died and I have not bothered to have it replaced. Sad times, but I've leant towards console gaming for 
                    simplicity, and quite frankly have prioritised my new audio hobby!
                    </p>
                    <br>
                    <h2 class="title is-4 has-bottom-highlight">Professional Life</h2>
                    <p>
                    Because nearly everyone has to have a job, unless they're a lucky millionaire or something, I too have joined in a got myself a job. I currently work full time
                      at my local Iceland Foods store as a Supervisor. Some how I've fooled everyone in to thinking I can actually do a decent job and managed to work my way up in the 
                      ranks! Go me! Whilst I never really intended on a career in retail, it kinda just happened. It's pretty challenging, and each day is roughly similar but can throw an interesting
                      plot twists here and there.
                    </p>
                    <br>
                    <h2 class="title is-4 has-bottom-highlight">Personal Life</h2>
                    <p>What? My personal life essentially revolves around the hobbies I listed above... What else could I possibly need to disclose for you to poke fun at me for??</p>
                </div>
            </div>
        </div>
    </section>
@endsection
