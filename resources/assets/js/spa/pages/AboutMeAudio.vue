<template>
    <div>
        <section class="hero is-medium is-light is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="is-1 title">Audio Gear</h1>
                    <h2 class="subtitle" style="hsla(0, 0%, 100%, 70%) !important">My Collection</h2>
                </div>
            </div>
        </section>
        <section class="section site-content">
            <div class="container container-into-hero">
                <div class="card">
                    <div class="card-content">
                        <h2 class="subtitle has-bottom-highlight">
                          Before we go on...
                        </h2>
                        <p>
                            So, either you've ended up here as some sort of sick joke, or you have an actual interest in my audio gear... Why? I don't know
                            but I'm not going to disappoint you now you're here!
                        </p>
                        <p>
                            Audio gear is a recent development for me, first starting out with some iteration of Bose headphones, which at the time were better than 
                            anything else I'd have smothered by ears in, but alas, I was in for a treat (and my wallet, a massive shock!) as I took my first ventures 
                            into the wonderful, 'audiophile' world. So, I will now list off my equipment.
                        </p>
                        
                        <h2 class="subtitle m-t-md has-bottom-highlight">
                            Amplifiers &amp; DACs
                        </h2>
                        <p>
                            <ul>
                                <li>Fiio E10K Olympus</li> 
                                <li>SMSL M6</li> 
                                <li>Dark Voice 336 (stock tubes) </li>
                                <li>Chord Mojo </li>
                                <li>Makie Big Knob </li>
                                <li>Aune X1S </li>
                                <li>Aune X7S </li>
                                <li>Questyle CMA400i</li>
                                <li>Fiio Q1 MK 2</li>
                            </ul>
                        </p>
                      
                        <h2 class="subtitle m-t-md has-bottom-highlight">
                          Headphones and IEMs
                        </h2>
                        <p>
                            <h3 class="subtitle">My IEMs</h3>
                            <ul>
                                <li>Audeze iSine 20</li>
                                <li>Fiio FH1</li>
                            </ul>
                      
                            <h3 class="subtitle">My Headphones</h3>
                            <ul>
                                <li>Sennheiser HD650</li>
                                <li>Hifiman 4xx</li>
                                <li>Fostex T50RP</li>
                                <li>Mr Speakers Aeon Closed</li>
                                <li>Audeze LCD-X</li>
                                <li>Focal Clear</li>
                                <li>Beyerdynamic DT1770</li>
                                <li>Fostex T60RP</li>
                            </ul>
                      
                            <h3 class="subtitle">Headphone/IEM Wishlist</h3>
                            <ul>
                                <li>Sennheiser HD820</li>
                                <li>Beyerdynamic Xelento</li>
                            </ul>
                        </p>
                      
                        <h2 class="subtitle has-bottom-highlight">Audio Sources</h2>
                        <p>
                            <ul>
                                <li>Fiio X7 MK2</li>
                                <li>Hiby R6</li>
                            </ul> 
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Page from './../components/Page.js';

export default Page.extend({
    data: function () {
        return {
            view: {
                name: 'AboutMe',
                title: 'About Me'
            }
        }
    }
});
</script>
