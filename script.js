/* =================================================================
   Mariyam Fatima Love Website Script
   Interactive animations, Web Audio synthesizer music box & SFX
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===============================================================
  // 1. WEB AUDIO SYNTHESIZER (MUSIC BOX & SOUND EFFECTS)
  // ===============================================================
  let audioCtx = null;
  let isSoundEnabled = true;
  let isMusicPlaying = false;
  let musicInterval = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Play a gentle bell/music-box note
  function playNote(freq, duration = 0.6, type = 'sine', gainVal = 0.15) {
    if (!isSoundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Sound FX: Sparkle chime
  function playSparkleSound() {
    initAudio();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => playNote(freq, 0.4, 'triangle', 0.12), idx * 80);
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
      osc.frequency.setValueAtTime(420, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, audioCtx.currentTime + 0.08);

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
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.linearRampToValueAtTime(880, now + 0.15);
      osc.frequency.linearRampToValueAtTime(600, now + 0.35);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  // Cozy Music-Box Lullaby Sequence
  const melodyNotes = [
    523.25, 659.25, 783.99, 659.25,  // C5, E5, G5, E5
    880.00, 783.99, 659.25, 587.33,  // A5, G5, E5, D5
    523.25, 587.33, 659.25, 783.99,  // C5, D5, E5, G5
    880.00, 1046.5, 783.99, 659.25   // A5, C6, G5, E5
  ];
  let noteIdx = 0;

  function toggleMusic() {
    initAudio();
    isMusicPlaying = !isMusicPlaying;
    const musicBtnText = document.getElementById('music-btn-text');

    if (isMusicPlaying) {
      musicBtnText.textContent = "Pause Melody";
      musicInterval = setInterval(() => {
        const freq = melodyNotes[noteIdx % melodyNotes.length];
        playNote(freq, 0.9, 'triangle', 0.09);
        // Soft harmony bass
        if (noteIdx % 4 === 0) {
          playNote(freq / 2, 1.2, 'sine', 0.06);
        }
        noteIdx++;
      }, 550);
    } else {
      musicBtnText.textContent = "Play Cozy Lullaby";
      clearInterval(musicInterval);
    }
  }

  // Toolbar Buttons
  document.getElementById('music-btn').addEventListener('click', toggleMusic);
  const soundBtn = document.getElementById('sound-btn');
  const soundBtnText = document.getElementById('sound-btn-text');
  soundBtn.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    soundBtnText.textContent = isSoundEnabled ? "Sound: ON" : "Sound: OFF";
    if (isSoundEnabled) playPopSound();
  });


  // ===============================================================
  // 2. HERO KITTEN PETTING INTERACTION
  // ===============================================================
  const heroKitten = document.getElementById('hero-kitten');
  const normalEyes = heroKitten.querySelector('.normal-eyes');
  const happyEyes = heroKitten.querySelector('.happy-eyes');
  const kittenSpeech = document.getElementById('kitten-speech');

  const kittenPraiseMessages = [
    "Purrrrrr! Mariyam is my favorite human! 💜",
    "*happy kitten headbutts* You're so sweet! ✨",
    "Meowww! Sending you the softest cuddle! 🐾",
    "Mariyam's smile makes the whole world brighter! 🌸",
    "Purrr! Keep petting me, Mariyam! 😻",
    "100% kitten approved: Mariyam is the cutest! 🍨",
    "Warm purrs & endless affection for Mariyam! 💜"
  ];

  heroKitten.addEventListener('click', (e) => {
    playKittenMeow();
    
    // Switch eyes to happy squint
    normalEyes.style.display = 'none';
    happyEyes.style.display = 'block';
    
    // Random cute speech
    const randomMsg = kittenPraiseMessages[Math.floor(Math.random() * kittenPraiseMessages.length)];
    kittenSpeech.textContent = randomMsg;
    
    // Spawn floating purple hearts from the kitten
    const rect = heroKitten.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
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
  let hugsCount = parseInt(localStorage.getItem('mariyam_hugs') || '120');
  let kissesCount = parseInt(localStorage.getItem('mariyam_kisses') || '250');

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

    comboStatusEl.textContent = "Overloaded with 10 hugs + 10 kisses! 💜";
    setTimeout(() => {
      comboStatusEl.textContent = "Ready to pamper Mariyam!";
    }, 2500);

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
      const envelopeTokens = ['💌', '💜', '✨', '🌸', '🐾'];
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
      modalTreatTitle.textContent = `${treatName} for Mariyam!`;
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
  // 6. JAR OF SWEET REASONS
  // ===============================================================
  const reasonsList = [
    "Your smile is so radiant that it can brighten even my darkest and most exhausting days.",
    "The cute way you laugh when something genuinely delights you.",
    "Your kindness and gentle heart make everyone around you feel valued and safe.",
    "How breathtaking you look without even trying.",
    "You are my absolute safest place in this chaotic world.",
    "Your sweet eyes that hold so much warmth and softness.",
    "The way you make ordinary moments feel like lovely little adventures.",
    "How deeply you care about the people and things you love.",
    "Your cozy, beautiful soul that makes me want to be the best version of myself.",
    "The sound of your voice—it brings me instant peace no matter what.",
    "How adorable you look whenever you get excited about things you love.",
    "Your unconditional warmth and the sweetest cuddles in existence.",
    "You inspire me every day with your grace, patience, and tenderness.",
    "Because loving you is the easiest, most natural and wonderful thing I've ever done.",
    "The way you appreciate little cute things—just like little kittens, purple skies, and pastries!",
    "No matter how many people are in a room, my eyes will always search for Mariyam.",
    "You have the sweetest mind and the purest heart.",
    "Every memory made with you becomes an instant favorite.",
    "Because you make me feel so lucky, grateful, and blessed to have you in my life.",
    "You are my dream girl, my best friend, and my whole heart."
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

    // Pick new reason sequentially or randomly
    currentReasonIndex = (currentReasonIndex + 1) % reasonsList.length;
    const reason = reasonsList[currentReasonIndex];

    // Smooth transition
    noteTextEl.style.opacity = '0';
    noteTextEl.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      noteTextEl.textContent = `"${reason}" 💜`;
      noteCounterEl.textContent = `Reason #${currentReasonIndex + 1} of ${reasonsList.length} (and counting!)`;
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
  // 9. AMBIENT BACKGROUND CANVAS PARTICLES
  // ===============================================================
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Soft purple sparkles, hearts, and stars
  const particles = [];
  const particleTypes = ['heart', 'star', 'sparkle', 'paw'];
  const colors = [
    'rgba(168, 85, 247, 0.45)', // purple-500
    'rgba(192, 132, 252, 0.55)', // purple-400
    'rgba(216, 180, 254, 0.65)', // purple-300
    'rgba(244, 114, 182, 0.45)', // pink-400
    'rgba(254, 240, 138, 0.55)'  // yellow pastel
  ];

  for (let i = 0; i < 42; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 5,
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
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    // bottom left curve
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
    // bottom right curve
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    // top right curve
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawStar(ctx, x, y, size, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    const spikes = 4;
    const outerRadius = size;
    const innerRadius = size * 0.4;
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
        drawStar(ctx, p.x, p.y, p.size * 0.7, p.color);
      }
    });

    requestAnimationFrame(animateCanvas);
  }

  animateCanvas();

});
