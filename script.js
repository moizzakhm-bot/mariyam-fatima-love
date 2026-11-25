/* =================================================================
   Mariyam Fatima Love Website Script
   Theme: Dark Purple Midnight & Neon Violet
   Music: 'we fell in love in october' (girl in red - "My Girl" Chorus)
   Dedicated to Baby, Bubb & Boo Boo 💜
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===============================================================
  // 1. WEB AUDIO SYNTHESIZER: "WE FELL IN LOVE IN OCTOBER" (MY GIRL)
  // ===============================================================
  let audioCtx = null;
  let isSoundEnabled = true;
  let isMusicPlaying = false;
  let songTimeout = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play warm dreamy note (synth guitar / vocal tone)
  function playDreamTone(freq, duration = 0.5, type = 'sine', gainVal = 0.14) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Warm analog low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Sound FX: Sparkle chime
  function playSparkleSound() {
    initAudio();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.5]; // C5, E5, G5, C6, E6
    notes.forEach((freq, idx) => {
      setTimeout(() => playDreamTone(freq, 0.45, 'triangle', 0.12), idx * 75);
    });
  }

  // Sound FX: Pop / Button Click
  function playPopSound() {
    initAudio();
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  // Sound FX: Kitten Purr / Meow Synth
  function playKittenMeow() {
    initAudio();
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      
      const now = audioCtx.currentTime;
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.linearRampToValueAtTime(920, now + 0.15);
      osc.frequency.linearRampToValueAtTime(640, now + 0.35);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // ===============================================================
  // SONG COMPOSITION: "we fell in love in october" - Chorus ("My Girl")
  // ===============================================================
  // Musical notes in C major / dream pop guitar
  const C3 = 130.81, E3 = 164.81, G3 = 196.00, B3 = 246.94;
  const F3 = 174.61, A3 = 220.00, C4 = 261.63, D4 = 293.66, E4 = 329.63, G4 = 392.00, A4 = 440.00, B4 = 493.88, C5 = 523.25;

  // The chorus phrase sequence: (melody note, chord bass, duration in ms, lyric line)
  const octoberSongSequence = [
    // Intro dreamy strum (Cmaj7)
    { lead: E4, bass: C3, time: 380, lyric: "♪ (soft guitar strumming) 🍂💜" },
    { lead: G4, bass: G3, time: 380, lyric: "♪ 'Cause we fell in love in October... 🍂" },
    { lead: B4, bass: B3, time: 420, lyric: "♪ That's why I love fall... 🍂" },
    { lead: C5, bass: C3, time: 480, lyric: "♪ Looking at the stars... ✨" },

    // Chorus: "My girl, my girl, my girl"
    { lead: E4, bass: C3, time: 350, lyric: "♪ My girl... 🍂" },
    { lead: G4, bass: G3, time: 380, lyric: "♪ My girl... 💜" },
    { lead: E4, bass: C3, time: 350, lyric: "♪ My girl... (my baby) 🍂" },
    { lead: G4, bass: G3, time: 380, lyric: "♪ My girl... 💜" },
    { lead: E4, bass: C3, time: 350, lyric: "♪ My girl... (my bubb) 🍂" },
    { lead: G4, bass: G3, time: 450, lyric: "♪ My girl... 💜" },

    // "You will be my girl"
    { lead: G4, bass: F3, time: 320, lyric: "♪ You will be my girl... 🍂💜" },
    { lead: A4, bass: C4, time: 320, lyric: "♪ You will be my girl... 🍂💜" },
    { lead: G4, bass: A3, time: 340, lyric: "♪ You will be my girl... 🍂💜" },
    { lead: E4, bass: F3, time: 360, lyric: "♪ You will be my girl, baby... 💜" },
    { lead: D4, bass: C4, time: 380, lyric: "♪ (You will be my girl) 🍂" },
    { lead: C4, bass: F3, time: 520, lyric: "♪ ...My girl 💜" },

    // Second chorus line: "My girl, my girl, my girl" -> "You will be my world"
    { lead: E4, bass: C3, time: 350, lyric: "♪ My girl... (my boo boo) 🍂" },
    { lead: G4, bass: G3, time: 380, lyric: "♪ My girl... 💜" },
    { lead: E4, bass: C3, time: 350, lyric: "♪ My girl... 🍂" },
    { lead: G4, bass: G3, time: 380, lyric: "♪ My girl... 💜" },
    { lead: E4, bass: C3, time: 350, lyric: "♪ My girl... (forever my baby) 🍂" },
    { lead: G4, bass: G3, time: 450, lyric: "♪ My girl... 💜" },

    // "You will be my world"
    { lead: G4, bass: F3, time: 320, lyric: "♪ You will be my world... 🌍💜" },
    { lead: A4, bass: C4, time: 320, lyric: "♪ You will be my world... 🌍💜" },
    { lead: G4, bass: A3, time: 340, lyric: "♪ You will be my world... 🌍💜" },
    { lead: E4, bass: F3, time: 360, lyric: "♪ You will be my world, bubb... 💜" },
    { lead: D4, bass: C4, time: 380, lyric: "♪ (You will be my world) ✨" },
    { lead: C4, bass: F3, time: 520, lyric: "♪ ...My whole world 💜" },

    // Third chorus line: "My world, my world, my world... you will be my girl"
    { lead: E4, bass: C3, time: 350, lyric: "♪ My world... 🍂" },
    { lead: G4, bass: G3, time: 380, lyric: "♪ My world... (my baby) 💜" },
    { lead: E4, bass: C3, time: 350, lyric: "♪ My world... 🍂" },
    { lead: G4, bass: G3, time: 380, lyric: "♪ My world... (my boo boo) 💜" },

    // Finish phrase
    { lead: G4, bass: F3, time: 320, lyric: "♪ You will be my girl... 🍂💜" },
    { lead: A4, bass: C4, time: 340, lyric: "♪ You will be my girl... 🍂💜" },
    { lead: G4, bass: A3, time: 360, lyric: "♪ You will be my girl, Mariyam... 💜" },
    { lead: E4, bass: F3, time: 400, lyric: "♪ Always my baby, my bubb, my boo boo ✨" },
    { lead: C4, bass: C3, time: 750, lyric: "♪ (Forever & always) 🍂💜 ♪" }
  ];

  let songStep = 0;
  const lyricsTextEl = document.getElementById('lyrics-text');

  function stepSong() {
    if (!isMusicPlaying) return;

    const item = octoberSongSequence[songStep % octoberSongSequence.length];
    
    // Play lead vocal melody note
    playDreamTone(item.lead, item.time / 1000 * 1.3, 'triangle', 0.14);
    
    // Play warm guitar bass harmony note
    if (item.bass) {
      playDreamTone(item.bass, item.time / 1000 * 1.5, 'sine', 0.08);
    }

    // Update synchronized lyrics
    if (lyricsTextEl && item.lyric) {
      lyricsTextEl.textContent = item.lyric;
    }

    songStep++;
    songTimeout = setTimeout(stepSong, item.time);
  }

  function toggleMusic() {
    initAudio();
    isMusicPlaying = !isMusicPlaying;
    const musicBtnText = document.getElementById('music-btn-text');

    if (isMusicPlaying) {
      musicBtnText.textContent = "Pause 'My Girl'";
      stepSong();
    } else {
      musicBtnText.textContent = "Play: We Fell in Love in October";
      clearTimeout(songTimeout);
      if (lyricsTextEl) {
        lyricsTextEl.textContent = '"My girl, my girl, my girl... you will be my girl 🍂💜"';
      }
    }
  }

  // Music Button
  document.getElementById('music-btn').addEventListener('click', toggleMusic);

  // Sound FX Toggle
  const soundBtn = document.getElementById('sound-btn');
  const soundBtnText = document.getElementById('sound-btn-text');
  soundBtn.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    soundBtnText.textContent = isSoundEnabled ? "Sound: ON" : "Sound: OFF";
    if (isSoundEnabled) playPopSound();
  });


  // ===============================================================
  // 2. HERO KITTEN PETTING INTERACTION (WITH BABY, BUBB & BOO BOO)
  // ===============================================================
  const heroKitten = document.getElementById('hero-kitten');
  const normalEyes = heroKitten.querySelector('.normal-eyes');
  const happyEyes = heroKitten.querySelector('.happy-eyes');
  const kittenSpeech = document.getElementById('kitten-speech');

  const kittenPraiseMessages = [
    "Purrrrrr! Mariyam is my baby, my sweet bubb! 💜",
    "*happy kitten headbutts* I love you so much boo boo! ✨",
    "Meowww! The warmest cuddle for my precious baby! 🐾",
    "You're my favorite human, my darling bubb! 🌸",
    "Purrr! Endless purrs for baby boo boo Mariyam! 😻",
    "100% baby approved: You're the sweetest boo boo in the universe! 🍨",
    "You will always be my girl, my baby, my bubb! 🍂💜"
  ];

  heroKitten.addEventListener('click', () => {
    playKittenMeow();
    
    // Switch eyes to happy squint
    normalEyes.style.display = 'none';
    happyEyes.style.display = 'block';
    
    // Random cute speech
    const randomMsg = kittenPraiseMessages[Math.floor(Math.random() * kittenPraiseMessages.length)];
    kittenSpeech.textContent = randomMsg;
    
    // Spawn floating purple hearts
    const rect = heroKitten.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
      spawnFloatingItem('💜', rect.left + rect.width / 2 + (Math.random() * 60 - 30), rect.top + 20);
    }

    setTimeout(() => {
      normalEyes.style.display = 'block';
      happyEyes.style.display = 'none';
    }, 1200);
  });


  // ===============================================================
  // 3. HUGS & KISSES DISPENSER
  // ===============================================================
  let hugsCount = parseInt(localStorage.getItem('mariyam_hugs') || '150');
  let kissesCount = parseInt(localStorage.getItem('mariyam_kisses') || '320');

  const hugCounterEl = document.getElementById('hug-counter');
  const kissCounterEl = document.getElementById('kiss-counter');
  const comboStatusEl = document.getElementById('combo-status');

  hugCounterEl.textContent = hugsCount.toLocaleString();
  kissCounterEl.textContent = kissesCount.toLocaleString();

  // Send Hug
  document.getElementById('send-hug-btn').addEventListener('click', (e) => {
    playPopSound();
    hugsCount++;
    localStorage.setItem('mariyam_hugs', hugsCount);
    hugCounterEl.textContent = hugsCount.toLocaleString();

    const rect = e.target.getBoundingClientRect();
    const symbols = ['🫂', '💜', '🐾', '✨', '🧸'];
    for (let i = 0; i < 6; i++) {
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      spawnFloatingItem(sym, rect.left + rect.width / 2, rect.top);
    }
  });

  // Send Kiss
  document.getElementById('send-kiss-btn').addEventListener('click', (e) => {
    playSparkleSound();
    kissesCount++;
    localStorage.setItem('mariyam_kisses', kissesCount);
    kissCounterEl.textContent = kissesCount.toLocaleString();

    const rect = e.target.getBoundingClientRect();
    const symbols = ['💋', '💖', '😘', '💜', '✨'];
    for (let i = 0; i < 6; i++) {
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      spawnFloatingItem(sym, rect.left + rect.width / 2, rect.top);
    }
  });

  // Mega Combo Attack
  document.getElementById('send-combo-btn').addEventListener('click', () => {
    playSparkleSound();
    hugsCount += 10;
    kissesCount += 10;
    localStorage.setItem('mariyam_hugs', hugsCount);
    localStorage.setItem('mariyam_kisses', kissesCount);
    hugCounterEl.textContent = hugsCount.toLocaleString();
    kissCounterEl.textContent = kissesCount.toLocaleString();

    comboStatusEl.textContent = "Pampered my baby bubb boo boo with 10 hugs + 10 kisses! 💜";
    setTimeout(() => {
      comboStatusEl.textContent = "Ready to pamper my baby bubb boo boo! 💜";
    }, 2800);

    // Screen-wide explosion of love
    const loveTokens = ['💜', '💋', '🫂', '🍨', '🍰', '🧁', '🐾', '✨', '💖'];
    for (let i = 0; i < 28; i++) {
      setTimeout(() => {
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight * 0.75 + (Math.random() * 150);
        const token = loveTokens[Math.floor(Math.random() * loveTokens.length)];
        spawnFloatingItem(token, x, y);
      }, i * 40);
    }
  });


  // ===============================================================
  // 4. INTERACTIVE LOVE LETTER & ENVELOPE
  // ===============================================================
  const envelope = document.getElementById('envelope');
  const envelopeSeal = document.getElementById('envelope-seal');
  const letterContent = document.getElementById('letter-content');

  function openEnvelope() {
    if (!envelope.classList.contains('opened')) {
      playSparkleSound();
      envelope.classList.add('opened');

      // Sparkle burst from envelope
      const rect = envelope.getBoundingClientRect();
      const envelopeTokens = ['💌', '💜', '✨', '🍂', '🐾'];
      for (let i = 0; i < 12; i++) {
        spawnFloatingItem(
          envelopeTokens[Math.floor(Math.random() * envelopeTokens.length)],
          rect.left + rect.width / 2,
          rect.top + 80
        );
      }
    }
  }

  envelopeSeal.addEventListener('click', openEnvelope);
  letterContent.addEventListener('click', openEnvelope);


  // ===============================================================
  // 5. MARIYAM'S SWEET CAFE & ICE CREAM PARLOUR
  // ===============================================================
  const treatModal = document.getElementById('treat-modal');
  const modalTreatEmoji = document.getElementById('modal-treat-emoji');
  const modalTreatTitle = document.getElementById('modal-treat-title');
  const modalTreatText = document.getElementById('modal-treat-text');
  const closeTreatModal = document.getElementById('close-treat-modal');
  const enjoyTreatBtn = document.getElementById('enjoy-treat-btn');

  document.querySelectorAll('.treat-card').forEach(card => {
    const orderBtn = card.querySelector('.treat-order-btn');
    const treatName = card.dataset.treat;
    const treatMsg = card.dataset.message;
    const treatEmoji = card.querySelector('.treat-emoji').textContent;

    const serveTreat = () => {
      playSparkleSound();
      modalTreatEmoji.textContent = treatEmoji;
      modalTreatTitle.textContent = `${treatName} for Baby!`;
      modalTreatText.textContent = treatMsg;
      treatModal.classList.remove('hidden');

      // Spawn treats around the card
      const rect = card.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        spawnFloatingItem(treatEmoji, rect.left + rect.width / 2, rect.top);
      }
    };

    orderBtn.addEventListener('click', serveTreat);
    card.addEventListener('click', (e) => {
      if (e.target !== orderBtn) serveTreat();
    });
  });

  const dismissModal = () => {
    playPopSound();
    treatModal.classList.add('hidden');
  };

  closeTreatModal.addEventListener('click', dismissModal);
  enjoyTreatBtn.addEventListener('click', dismissModal);
  treatModal.querySelector('.treat-modal-backdrop').addEventListener('click', dismissModal);


  // ===============================================================
  // 6. JAR OF SWEET REASONS (WITH BABY, BUBB & BOO BOO)
  // ===============================================================
  const reasonsList = [
    "You will always be my girl, my world, and my baby.",
    "The cute way my bubb laughs when something genuinely delights you.",
    "How my heart melts every single time you look at me or call me, baby.",
    "Your kindness and gentle heart make me feel so safe and cherished, bubb.",
    "How breathtaking my boo boo looks without even trying.",
    "You are my absolute safest place in this entire chaotic world, baby.",
    "Your sweet eyes that hold infinite warmth and softness, my bubb.",
    "The adorable way my boo boo gets so excited about little cute things.",
    "Because loving you is the easiest, most natural and sweetest thing in my life, baby.",
    "The sound of your voice—it brings me instant peace no matter what, bubb.",
    "How lucky and blessed I feel every single day to call you my girl, boo boo.",
    "Your cozy, beautiful soul that makes my whole world brighter, baby.",
    "The warmest cuddles and softest hugs that belong only to my bubb.",
    "You inspire me every day with your gentle grace, sweet boo boo.",
    "Because no matter how crowded a room is, my eyes will always search for you, baby.",
    "You have the sweetest mind and the purest heart, my darling bubb.",
    "Every memory made with my boo boo becomes my favorite memory.",
    "Because you're my dream girl, my best friend, and my whole heart, baby.",
    "You deserve all the pastries, ice creams, and purple stardust in existence, bubb.",
    "Forever and always, you will be my girl, my baby, and my boo boo."
  ];

  let currentReasonIndex = 0;
  const noteTextEl = document.getElementById('note-text');
  const noteCounterEl = document.getElementById('note-counter');
  const drawReasonBtn = document.getElementById('draw-reason-btn');
  const reasonsJar = document.getElementById('reasons-jar');

  function drawReason() {
    playSparkleSound();
    
    // Jar shake animation
    reasonsJar.style.transform = 'scale(1.1) rotate(6deg)';
    setTimeout(() => {
      reasonsJar.style.transform = 'scale(1.05) rotate(-6deg)';
    }, 120);
    setTimeout(() => {
      reasonsJar.style.transform = '';
    }, 260);

    // Pick new reason sequentially
    currentReasonIndex = (currentReasonIndex + 1) % reasonsList.length;
    const reason = reasonsList[currentReasonIndex];

    // Smooth transition
    noteTextEl.style.opacity = '0';
    noteTextEl.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      noteTextEl.textContent = `"${reason}" 💜`;
      noteCounterEl.textContent = `Reason #${currentReasonIndex + 1} of ${reasonsList.length} for Boo Boo (and counting!)`;
      noteTextEl.style.opacity = '1';
      noteTextEl.style.transform = 'translateY(0)';
    }, 180);

    // Floating stars
    const rect = reasonsJar.getBoundingClientRect();
    const starItems = ['⭐', '✨', '💜', '🌟'];
    for (let i = 0; i < 5; i++) {
      spawnFloatingItem(
        starItems[Math.floor(Math.random() * starItems.length)],
        rect.left + rect.width / 2,
        rect.top + 40
      );
    }
  }

  drawReasonBtn.addEventListener('click', drawReason);
  reasonsJar.addEventListener('click', drawReason);


  // ===============================================================
  // 7. KITTEN NURSERY / PLAYGROUND
  // ===============================================================
  const kittenReactionBox = document.getElementById('kitten-reaction-box');
  const kittenReactionText = document.getElementById('kitten-reaction-text');

  document.querySelectorAll('.play-kitten-card').forEach(card => {
    const petBtn = card.querySelector('.pet-btn');
    const name = card.dataset.name;
    const reaction = card.dataset.reaction;

    const petKitten = () => {
      playKittenMeow();
      kittenReactionText.textContent = `✨ ${name}: "${reaction}" 💜`;
      
      // Floating paw/heart
      const rect = card.getBoundingClientRect();
      spawnFloatingItem('🐾', rect.left + rect.width / 2, rect.top + 30);
      spawnFloatingItem('💜', rect.left + rect.width / 2 + 15, rect.top + 20);
    };

    petBtn.addEventListener('click', petKitten);
    card.addEventListener('click', (e) => {
      if (e.target !== petBtn) petKitten();
    });
  });


  // ===============================================================
  // 8. FLOATING FX GENERATOR
  // ===============================================================
  function spawnFloatingItem(symbol, startX, startY) {
    const el = document.createElement('div');
    el.className = 'floating-fx-item';
    el.textContent = symbol;
    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;
    el.style.fontSize = `${Math.floor(Math.random() * 16 + 24)}px`;

    // Random trajectory
    const rx = (Math.random() - 0.5) * 120;
    const rx2 = (Math.random() - 0.5) * 180;
    const rr = (Math.random() - 0.5) * 60;
    const rr2 = (Math.random() - 0.5) * 90;

    el.style.setProperty('--rx', `${rx}px`);
    el.style.setProperty('--rx2', `${rx2}px`);
    el.style.setProperty('--rr', `${rr}deg`);
    el.style.setProperty('--rr2', `${rr2}deg`);

    document.body.appendChild(el);

    setTimeout(() => {
      if (el && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 2400);
  }


  // ===============================================================
  // 9. AMBIENT BACKGROUND CANVAS (GLOWING DARK PURPLE COSMOS)
  // ===============================================================
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Glowing neon violet sparkles, purple stars, and hearts
  const particles = [];
  const particleTypes = ['heart', 'star', 'sparkle'];
  const colors = [
    'rgba(192, 132, 252, 0.75)', // neon violet
    'rgba(232, 121, 249, 0.65)', // neon magenta
    'rgba(168, 85, 247, 0.7)',  // deep purple
    'rgba(244, 114, 182, 0.55)', // soft pink
    'rgba(253, 224, 71, 0.7)'   // starlight yellow
  ];

  for (let i = 0; i < 48; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 0.45 + 0.15,
      speedX: (Math.random() - 0.5) * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02
    });
  }

  function drawHeart(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawStar(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    const spikes = 4;
    const outerRadius = size;
    const innerRadius = size * 0.35;
    let rot = (Math.PI / 2) * 3;
    let step = Math.PI / spikes;

    ctx.moveTo(x, y - outerRadius);
    for (let i = 0; i < spikes; i++) {
      let sx = x + Math.cos(rot) * outerRadius;
      let sy = y + Math.sin(rot) * outerRadius;
      ctx.lineTo(sx, sy);
      rot += step;

      sx = x + Math.cos(rot) * innerRadius;
      sy = y + Math.sin(rot) * innerRadius;
      ctx.lineTo(sx, sy);
      rot += step;
    }
    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.angle += p.spin;

      if (p.y < -30) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }
      if (p.x < -30) p.x = width + 20;
      if (p.x > width + 30) p.x = -20;

      if (p.type === 'heart') {
        drawHeart(ctx, p.x, p.y, p.size, p.color);
      } else {
        drawStar(ctx, p.x, p.y, p.size * 0.75, p.color);
      }
    });

    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();

});
