/* ==========================================================================
   YATHARTHA RASTOGI - PORTFOLIO SCRIPT WITH HORIZONTAL SPACE SHOOTER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. TYPEWRITER ANIMATION & ROLE SWAP
     -------------------------------------------------------------------------- */
  const typewriterEl = document.getElementById('typewriter');
  const names = ['Yathartha', 'Full Stack Dev', 'Software Engineer', 'Python Builder'];
  let nameIndex = 0;
  let charIndex = names[0].length;
  let isDeleting = false;
  let isPaused = false;

  function typeEffect() {
    if (isPaused) return;

    const currentName = names[nameIndex];

    if (isDeleting) {
      charIndex--;
      typewriterEl.textContent = currentName.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        setTimeout(typeEffect, 300);
        return;
      }
    } else {
      charIndex++;
      typewriterEl.textContent = currentName.substring(0, charIndex);
      if (charIndex === currentName.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2200);
        return;
      }
    }

    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 1200);


  /* --------------------------------------------------------------------------
     2. TERMINAL TAB SWITCHER
     -------------------------------------------------------------------------- */
  const termTabs = document.querySelectorAll('.term-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  termTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      termTabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetTabId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetTabId);
      if (targetContent) targetContent.classList.add('active');
    });
  });


  /* --------------------------------------------------------------------------
     3. INTERACTIVE CLI CONSOLE PROMPT
     -------------------------------------------------------------------------- */
  const cliInput = document.getElementById('cli-input');
  const cliOutput = document.getElementById('cli-output');

  if (cliInput) {
    cliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = cliInput.value.trim().toLowerCase();
        cliInput.value = '';
        executeCliCommand(cmd);
      }
    });
  }

  function executeCliCommand(cmd) {
    if (!cliOutput) return;

    let response = '';

    switch (cmd) {
      case 'help':
        response = `Available commands:
  - skills    : View technical skills
  - projects  : List featured side quests
  - exp       : View experience log
  - contact   : Get contact information
  - matrix    : Easter egg mode
  - clear     : Clear output window`;
        break;

      case 'skills':
        response = `Languages : Python, C++, Java, JavaScript, SQL, HTML/CSS
Core      : Data Structures & Algorithms, Generative AI, Machine Learning, OOP, REST APIs, System Design
Frameworks: React, Next.js, Flask, Tailwind CSS, Prisma, LangChain, Pandas, NumPy`;
        break;

      case 'projects':
        response = `1. GitHub Recapped (Next.js, React, Tailwind, Prisma, Recharts)
2. Digital Declutterer (Python, CustomTkinter)`;
        break;

      case 'exp':
        response = `Technical Team Member @ BitByBit Club (Apr 2026 - Present)
• Lead web development and architectural planning
• Mentor team members through code reviews`;
        break;

      case 'contact':
        response = `Email    : yarag402@gmail.com
Phone    : +91 79845 09001
GitHub   : github.com/yathartharastogi
LinkedIn : linkedin.com/in/yathartha-rastogi`;
        break;

      case 'matrix':
        response = `Wake up, Neo... The Matrix has you.
(Click PLAY SPACE DEFENDER for the arcade shooter)`;
        break;

      case 'clear':
        cliOutput.textContent = '';
        return;

      case '':
        return;

      default:
        response = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
        break;
    }

    cliOutput.textContent = `yathartha@portfolio:~$ ${cmd}\n${response}\n`;
  }


  /* --------------------------------------------------------------------------
     4. PROJECT CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden-card');
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });


  /* --------------------------------------------------------------------------
     5. KEYBOARD NAV & SCROLL SPY
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.keyboard-base a[href^="#"]');
  const escBtn = document.getElementById('esc-btn');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeArcadeModal();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  if (escBtn) {
    escBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* --------------------------------------------------------------------------
     6. HERO COPY EMAIL BUTTON
     -------------------------------------------------------------------------- */
  const copyHeroBtn = document.getElementById('copy-email-hero-btn');
  const copyBtnText = document.getElementById('copy-btn-text');

  if (copyHeroBtn) {
    copyHeroBtn.addEventListener('click', () => {
      copyText('yarag402@gmail.com');
      if (copyBtnText) {
        const original = copyBtnText.textContent;
        copyBtnText.textContent = 'Copied to Clipboard! ✓';
        setTimeout(() => {
          copyBtnText.textContent = original;
        }, 2000);
      }
    });
  }


  /* --------------------------------------------------------------------------
     7. RETRO HORIZONTAL SPACE SHOOTER GAME ENGINE (CLEAN VECTOR CANVAS)
     -------------------------------------------------------------------------- */
  const spawnSpot = document.getElementById('arcade-spawn-spot');
  const arcadeModal = document.getElementById('arcade-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const closeArcadeAction = document.getElementById('close-arcade-action');
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  const btnUp = document.getElementById('btn-up');
  const btnDown = document.getElementById('btn-down');
  const btnLeft = document.getElementById('btn-left');
  const btnRight = document.getElementById('btn-right');
  const btnFire = document.getElementById('btn-fire');

  let animationFrameId = null;
  let isGameActive = false;

  // Game Physics State
  let player = { x: 30, y: 115, width: 32, height: 24, speed: 4.5, health: 100, shield: 100 };
  let boss = { x: 380, y: 100, width: 40, height: 40, health: 100, maxHealth: 100, dy: 1.5, active: true };
  let lasers = [];
  let enemies = [];
  let powerups = [];
  let particles = [];
  let score = 0;
  let gameOver = false;
  let keys = { left: false, right: false, up: false, down: false };
  let spawnTimer = 0;

  function openArcadeModal() {
    arcadeModal.classList.remove('hidden');
    isGameActive = true;
    resetGame();
    if (!animationFrameId) {
      gameLoop();
    }
  }

  function closeArcadeModal() {
    arcadeModal.classList.add('hidden');
    isGameActive = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }

  if (spawnSpot) spawnSpot.addEventListener('click', openArcadeModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeArcadeModal);
  if (closeArcadeAction) closeArcadeAction.addEventListener('click', closeArcadeModal);

  function resetGame() {
    player = { x: 30, y: 115, width: 32, height: 24, speed: 4.5, health: 100, shield: 100 };
    boss = { x: 380, y: 100, width: 40, height: 40, health: 100, maxHealth: 100, dy: 1.5, active: true };
    lasers = [];
    enemies = [];
    powerups = [];
    particles = [];
    score = 0;
    gameOver = false;
  }

  function fireLaser() {
    if (!isGameActive || gameOver) return;
    lasers.push({
      x: player.x + player.width,
      y: player.y + player.height / 2 - 2,
      width: 14,
      height: 4,
      speed: 9
    });
  }

  function spawnEntities() {
    spawnTimer++;
    
    if (spawnTimer % 50 === 0) {
      const types = ['asteroid', 'alien'];
      const type = types[Math.floor(Math.random() * types.length)];
      enemies.push({
        x: canvas.width + 20,
        y: Math.random() * (canvas.height - 60) + 30,
        radius: type === 'asteroid' ? 16 : 14,
        speed: 1.8 + Math.random() * 1.5,
        type: type
      });
    }

    if (spawnTimer % 220 === 0) {
      powerups.push({
        x: canvas.width + 20,
        y: Math.random() * (canvas.height - 70) + 35,
        radius: 12,
        speed: 1.5
      });
    }
  }

  function createExplosion(x, y, colorArr) {
    const colors = colorArr || ['#ef4444', '#f59e0b', '#38bdf8', '#ffffff'];
    for (let i = 0; i < 14; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.5) * 7,
        radius: Math.random() * 3 + 1,
        life: 22,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
  }

  function drawHealthBar(x, y, width, height, val, maxVal, color, label) {
    const pct = Math.max(0, Math.min(100, (val / maxVal) * 100));
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, height / 2);
    ctx.fill();
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    if (pct > 0) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, (width - 4) * (pct / 100), height - 4, (height - 4) / 2);
      ctx.fill();
    }

    ctx.fillStyle = '#020617';
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${label} ${Math.round(pct)}%`, x + width / 2, y + height / 2 + 3);
  }

  function drawPlayerShip(x, y) {
    ctx.save();
    ctx.translate(x, y);

    // Thruster flame
    ctx.fillStyle = Math.random() > 0.5 ? '#ef4444' : '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(-4, 8);
    ctx.lineTo(-12, 12);
    ctx.lineTo(-4, 16);
    ctx.fill();

    // Main Body
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(30, 12);
    ctx.lineTo(8, 0);
    ctx.lineTo(0, 6);
    ctx.lineTo(4, 12);
    ctx.lineTo(0, 18);
    ctx.lineTo(8, 24);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cockpit
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.ellipse(16, 12, 6, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawBossShip(x, y) {
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#020617';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(24, 0);
    ctx.lineTo(36, 8);
    ctx.lineTo(30, 20);
    ctx.lineTo(36, 32);
    ctx.lineTo(24, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(14, 20, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function drawAlienCraft(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#ef4444';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 12, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(0, -2, 4, Math.PI, 0);
    ctx.fill();
    ctx.restore();
  }

  function gameLoop() {
    if (!isGameActive) return;

    ctx.fillStyle = '#070b19';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 40; i++) {
      let starX = (canvas.width - ((i * 45 + Date.now() * 0.08) % canvas.width));
      let starY = (i * 27) % canvas.height;
      ctx.fillRect(starX, starY, (i % 2 === 0 ? 2 : 1), (i % 2 === 0 ? 2 : 1));
    }

    if (!gameOver) {

      if (keys.up && player.y > 35) player.y -= player.speed;
      if (keys.down && player.y < canvas.height - 30) player.y += player.speed;
      if (keys.left && player.x > 10) player.x -= player.speed;
      if (keys.right && player.x < canvas.width - 60) player.x += player.speed;

      drawPlayerShip(player.x, player.y);

      if (boss.active) {
        boss.y += boss.dy;
        if (boss.y < 35 || boss.y > canvas.height - 45) boss.dy *= -1;
        drawBossShip(boss.x, boss.y);
      }

      spawnEntities();

      ctx.fillStyle = '#38bdf8';
      for (let lIdx = lasers.length - 1; lIdx >= 0; lIdx--) {
        const l = lasers[lIdx];
        l.x += l.speed;
        
        ctx.fillRect(l.x, l.y, l.width, l.height);

        if (boss.active && l.x >= boss.x && l.x <= boss.x + boss.width && l.y >= boss.y && l.y <= boss.y + boss.height) {
          boss.health -= 5;
          createExplosion(l.x, l.y, ['#38bdf8', '#ffffff']);
          lasers.splice(lIdx, 1);
          score += 20;

          if (boss.health <= 0) {
            createExplosion(boss.x + 20, boss.y + 20, ['#ef4444', '#f59e0b', '#ffffff']);
            boss.active = false;
            score += 500;
          }
          continue;
        }

        if (l.x > canvas.width) {
          lasers.splice(lIdx, 1);
        }
      }

      for (let eIdx = enemies.length - 1; eIdx >= 0; eIdx--) {
        const e = enemies[eIdx];
        e.x -= e.speed;

        if (e.type === 'asteroid') {
          ctx.fillStyle = '#b45309';
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#78350f';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          drawAlienCraft(e.x, e.y);
        }

        for (let lIdx = lasers.length - 1; lIdx >= 0; lIdx--) {
          const l = lasers[lIdx];
          const dist = Math.hypot(l.x - e.x, l.y - e.y);
          if (dist < e.radius + 6) {
            createExplosion(e.x, e.y);
            enemies.splice(eIdx, 1);
            lasers.splice(lIdx, 1);
            score += 50;
            break;
          }
        }

        const pDist = Math.hypot((player.x + 16) - e.x, (player.y + 12) - e.y);
        if (pDist < e.radius + 14) {
          createExplosion(e.x, e.y);
          enemies.splice(eIdx, 1);

          if (player.shield > 0) {
            player.shield = Math.max(0, player.shield - 25);
          } else {
            player.health = Math.max(0, player.health - 25);
          }

          if (player.health <= 0) {
            createExplosion(player.x + 16, player.y + 12);
            gameOver = true;
          }
        }
      }

      for (let pIdx = powerups.length - 1; pIdx >= 0; pIdx--) {
        const p = powerups[pIdx];
        p.x -= p.speed;

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('+', p.x, p.y + 5);

        const pDist = Math.hypot((player.x + 16) - p.x, (player.y + 12) - p.y);
        if (pDist < p.radius + 14) {
          player.health = Math.min(100, player.health + 25);
          player.shield = Math.min(100, player.shield + 25);
          powerups.splice(pIdx, 1);
          score += 100;
        }
      }

      for (let ptIdx = particles.length - 1; ptIdx >= 0; ptIdx--) {
        const pt = particles[ptIdx];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
        ctx.fill();
        if (pt.life <= 0) particles.splice(ptIdx, 1);
      }

      drawHealthBar(12, 10, 110, 16, player.shield, 100, '#ef4444', 'SHIELD');
      drawHealthBar(12, 30, 110, 16, player.health, 100, '#10b981', 'HEALTH');

      if (boss.active) {
        drawHealthBar(canvas.width - 122, 10, 110, 16, boss.health, boss.maxHealth, '#ef4444', 'BOSS HP');
      }

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'right';
      ctx.fillText(`SCORE: ${score}`, canvas.width - 14, 42);

    } else {
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 22px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 12);

      ctx.fillStyle = '#ffffff';
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillText(`FINAL SCORE: ${score}`, canvas.width / 2, canvas.height / 2 + 15);
      ctx.fillText('Press SPACEBAR to Restart', canvas.width / 2, canvas.height / 2 + 40);
    }

    animationFrameId = requestAnimationFrame(gameLoop);
  }

  document.addEventListener('keydown', (e) => {
    if (!isGameActive) return;

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'KeyW', 'KeyS', 'KeyA', 'KeyD'].includes(e.code)) {
      e.preventDefault();

      if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = true;
      if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = true;
      if (['ArrowUp', 'KeyW'].includes(e.code)) keys.up = true;
      if (['ArrowDown', 'KeyS'].includes(e.code)) keys.down = true;

      if (e.code === 'Space') {
        if (gameOver) {
          resetGame();
        } else {
          fireLaser();
        }
      }
    }
  });

  document.addEventListener('keyup', (e) => {
    if (!isGameActive) return;
    if (['ArrowLeft', 'KeyA'].includes(e.code)) keys.left = false;
    if (['ArrowRight', 'KeyD'].includes(e.code)) keys.right = false;
    if (['ArrowUp', 'KeyW'].includes(e.code)) keys.up = false;
    if (['ArrowDown', 'KeyS'].includes(e.code)) keys.down = false;
  });

  if (btnUp) btnUp.addEventListener('click', () => { player.y = Math.max(35, player.y - 20); });
  if (btnDown) btnDown.addEventListener('click', () => { player.y = Math.min(canvas.height - 30, player.y + 20); });
  if (btnLeft) btnLeft.addEventListener('click', () => { player.x = Math.max(10, player.x - 20); });
  if (btnRight) btnRight.addEventListener('click', () => { player.x = Math.min(canvas.width - 60, player.x + 20); });

  if (btnFire) {
    btnFire.addEventListener('click', () => {
      if (gameOver) {
        resetGame();
      } else {
        fireLaser();
      }
    });
  }

});


/* --------------------------------------------------------------------------
   8. GLOBAL UTILITY FUNCTIONS
   -------------------------------------------------------------------------- */
function copyText(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnElement) {
      const origText = btnElement.textContent;
      btnElement.textContent = '✓ Copied';
      btnElement.style.background = '#10b981';
      btnElement.style.color = '#ffffff';

      setTimeout(() => {
        btnElement.textContent = origText;
        btnElement.style.background = '';
        btnElement.style.color = '';
      }, 2000);
    }
  }).catch(err => {
    console.error('Copy failed: ', err);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const statusEl = document.getElementById('form-status');

  if (statusEl) {
    statusEl.className = 'form-status-msg success';
    statusEl.textContent = `Thanks ${name}! Your message has been sent. Yathartha will get back to you soon!`;
  }

  event.target.reset();
}
