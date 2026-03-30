/* ============================================
   DAVID MONTERO — Clean Dynamic Dynamics
   Luxury Motion, Standard Interaction
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Scroll Progress Indicator --- */
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) scrollProgress.style.width = scrolled + "%";
  }, { passive: true });

  /* --- Typewriter Effect --- */
  const words = ["Arquitecturas Backend ", "Automatización con IA ", "Sistemas de Datos "];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeTarget = document.getElementById('typewriter');

  function type() {
    if (!typeTarget) return;
    const currentWord = words[wordIndex];

    typeTarget.textContent = isDeleting
      ? currentWord.substring(0, charIndex--)
      : currentWord.substring(0, charIndex++);

    let typeSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentWord.length + 1) {
      typeSpeed = 3500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 600;
    }

    setTimeout(type, typeSpeed);
  }
  type();

  /* --- Accordion Controller --- */
  const initAccordion = (selector, itemClass, bodyClass) => {
    document.querySelectorAll(selector).forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest(itemClass);
        const body = item.querySelector(bodyClass);

        const container = item.parentElement;
        container.querySelectorAll(itemClass).forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            other.querySelector(bodyClass).style.maxHeight = null;
          }
        });

        item.classList.toggle('active');
        body.style.maxHeight = item.classList.contains('active') ? body.scrollHeight + "px" : null;
      });
    });
  };

  initAccordion('.accordion-header', '.accordion-item', '.accordion-body');
  initAccordion('.stack-trigger', '.stack-item', '.stack-content');

  /* --- Intersection Observer for Reveals --- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 120);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  document.querySelectorAll('.reveal, .scale-reveal').forEach(el => revealObserver.observe(el));

  /* --- Background Subtle Movement (Scroll/Passive) --- */
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.pageYOffset;
      bgCanvas.style.transform = `translateY(${scrollPos * 0.1}px)`;
    }, { passive: true });
  }

  /* --- Smooth Anchor Scroll --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 64,
          behavior: 'smooth'
        });
      }
    });
  });

  /* --- Simulation of Automation 1: n8n Estudio de interiorismo --- */
  const runBtn1 = document.getElementById('run-automation-btn-1');
  const terminalBody1 = document.getElementById('terminal-body-1');

  if (runBtn1 && terminalBody1) {
    let isRunning1 = false;
    let originalPayload1 = terminalBody1.innerHTML;

    runBtn1.addEventListener('click', () => {
      if (isRunning1) return;

      if (runBtn1.textContent === 'Re-iniciar Simulación') {
        terminalBody1.innerHTML = originalPayload1;
        runBtn1.textContent = 'Ejecutar Pipeline n8n';
        return;
      }

      isRunning1 = true;
      runBtn1.style.opacity = '0.7';
      runBtn1.textContent = 'Procesando...';
      runBtn1.style.cursor = 'wait';

      terminalBody1.innerHTML = '<span class="json-loading">> [Webhook] Ingestando Lead ID 3470 desde Pipedrive...<br>> [Data] Normalizando y parseando entidades...</span>';

      setTimeout(() => {
        terminalBody1.innerHTML = '<span class="json-loading">> [Webhook] Ingestando Lead ID 3470 desde Pipedrive...<br>> [Data] Normalizando y parseando entidades...<br>> [LangChain] Consultando GPT-4o (Validador de Origen)...<br>> [Validador] Lead clasificado como "usuario_tipico" (Sin_Override)<br>> [LangChain] Consultando GPT-4o (Analista de Reformas)...<br>> [Analista] Reforma identificada como Integral.<br>> [Gemini] Validación semántica extra en progreso...<br>> [Scoring] Calculando métrica (Regla: base_v2_prioritario_pre)...</span>';
      }, 1500);

      setTimeout(() => {
        terminalBody1.innerHTML = `<pre><code class="language-json" style="color: #E6E6E6;">{
  <span class="json-key">"person_id"</span>: <span class="json-string">3470</span>,
  <span class="json-key">"score_final"</span>: <span class="json-string">"PRECUALIFICADO"</span>,
  <span class="json-key">"label_id"</span>: <span class="json-string">192</span>,
  <span class="json-key">"analisis_reforma"</span>: {
    <span class="json-key">"es_integral"</span>: <span class="json-string">"sí"</span>,
    <span class="json-key">"razonamiento"</span>: <span class="json-string">"El cliente menciona explícitamente querer hacer una reforma integral que afecta a distribución e instalaciones generales."</span>
  },
  <span class="json-key">"tipo_inmueble"</span>: <span class="json-string">"piso"</span>,
  <span class="json-key">"urgencia"</span>: <span class="json-string">"media"</span>,
  <span class="json-key">"action"</span>: <span class="json-string">"Label actualizado via API REST en Pipedrive"</span>
}</code></pre>`;
        runBtn1.textContent = 'Ejecutado con éxito';
        runBtn1.style.opacity = '1';
        runBtn1.style.cursor = 'pointer';

        setTimeout(() => {
          isRunning1 = false;
          runBtn1.textContent = 'Re-iniciar Simulación';
        }, 2000);
      }, 3500);
    });
  }

  /* --- Simulation of Automation 2: Make Meta Ads Óptica --- */
  const runBtn2 = document.getElementById('run-automation-btn-2');
  const terminalBody2 = document.getElementById('terminal-body-2');

  if (runBtn2 && terminalBody2) {
    let isRunning2 = false;
    let originalPayload2 = terminalBody2.innerHTML;

    runBtn2.addEventListener('click', () => {
      if (isRunning2) return;

      if (runBtn2.textContent === 'Re-iniciar Simulación') {
        terminalBody2.innerHTML = originalPayload2;
        runBtn2.textContent = 'Ejecutar Pipeline Make';
        return;
      }

      isRunning2 = true;
      runBtn2.style.opacity = '0.7';
      runBtn2.textContent = 'Procesando...';
      runBtn2.style.cursor = 'wait';

      terminalBody2.innerHTML = '<span class="json-loading">> [Webhook] Nuevo Lead recibido de Meta Ads (ID: 84893921)...<br>> [GPT-5-Mini] Normalizando identidad y corrigiendo anomalías...</span>';

      setTimeout(() => {
        terminalBody2.innerHTML = '<span class="json-loading">> [Webhook] Nuevo Lead recibido de Meta Ads (ID: 84893921)...<br>> [GPT-5-Mini] Normalizando identidad y corrigiendo anomalías...<br>> [Data] Telefóno corregido (Prefijo internacional y basura extraída).<br>> [Data] Nombre capitalizado, género (F) inferido, apellidos separados.<br>> [API] Consultando ERP Óptico (Visual) -> endpoint /Buscar Cliente...<br>> [Router] Cliente NO existente. Procediendo a inserción...</span>';
      }, 1500);

      setTimeout(() => {
        terminalBody2.innerHTML = `<pre><code class="language-json" style="color: #E6E6E6;">{
  <span class="json-key">"status"</span>: <span class="json-string">"success"</span>,
  <span class="json-key">"cliente_normalizado"</span>: {
    <span class="json-key">"nombre"</span>: <span class="json-string">"MARIA JOSE"</span>,
    <span class="json-key">"apellido1"</span>: <span class="json-string">"DEL CARMEN"</span>,
    <span class="json-key">"apellido2"</span>: <span class="json-string">"GOMEZ"</span>,
    <span class="json-key">"telefono"</span>: <span class="json-string">"615249653"</span>,
    <span class="json-key">"genero"</span>: <span class="json-string">"F"</span>  
  },
  <span class="json-key">"crm_status"</span>: <span class="json-string">"NUEVO_PACIENTE_CREADO"</span>,
  <span class="json-key">"origen"</span>: <span class="json-string">"FB_LeadAds"</span>
}</code></pre>`;
        runBtn2.textContent = 'Ejecutado con éxito';
        runBtn2.style.opacity = '1';
        runBtn2.style.cursor = 'pointer';

        setTimeout(() => {
          isRunning2 = false;
          runBtn2.textContent = 'Re-iniciar Simulación';
        }, 2000);
      }, 3500);
    });
  }

  /* --- Simulation of Automation 3: Metricool ETL --- */
  const runBtn3 = document.getElementById('run-automation-btn-3');
  const terminalBody3 = document.getElementById('terminal-body-3');

  if (runBtn3 && terminalBody3) {
    let isRunning3 = false;
    let originalPayload3 = terminalBody3.innerHTML;

    runBtn3.addEventListener('click', () => {
      if (isRunning3) return;

      if (runBtn3.textContent === 'Re-iniciar Simulación') {
        terminalBody3.innerHTML = originalPayload3;
        runBtn3.textContent = 'Ejecutar ETL Cron';
        return;
      }

      isRunning3 = true;
      runBtn3.style.opacity = '0.7';
      runBtn3.textContent = 'Extrayendo Datos...';
      runBtn3.style.cursor = 'wait';

      terminalBody3.innerHTML = '<span class="json-loading">> [Cron] Iniciando extracción diaria (00:05 AM)...<br>> [API Metricool] Autenticando token (Brand ID: 5565945)...</span>';

      setTimeout(() => {
        terminalBody3.innerHTML = '<span class="json-loading">> [Cron] Iniciando extracción diaria (00:05 AM)...<br>> [API Metricool] Autenticando token (Brand ID: 5565945)...<br>> [API Metricool] Petición 1: Obteniendo métricas de Instagram Reels (IGRE)...<br>> [API Metricool] Petición 2: Obteniendo métricas de YouTube Evolution (YTEV)...<br>> [Router] Transformando Data y unificando formato...<br>> [API Airtable] Empujando records a la DB "MÉTRICAS REDES"...</span>';
      }, 1500);

      setTimeout(() => {
        terminalBody3.innerHTML = `<pre><code class="language-json" style="color: #E6E6E6;">{
  <span class="json-key">"status"</span>: <span class="json-string">"success"</span>,
  <span class="json-key">"records_processed"</span>: <span class="json-string">2</span>,
  <span class="json-key">"airtable_inserts"</span>: [
    {
      <span class="json-key">"RED_SOCIAL"</span>: <span class="json-string">"Instagram Reels"</span>,
      <span class="json-key">"Impresiones"</span>: <span class="json-string">"4,502"</span>,
      <span class="json-key">"Views"</span>: <span class="json-string">"2,109"</span>,
      <span class="json-key">"Likes"</span>: <span class="json-string">"342"</span>
    },
    {
      <span class="json-key">"RED_SOCIAL"</span>: <span class="json-string">"YouTube"</span>,
      <span class="json-key">"Evolucion_Subs"</span>: <span class="json-string">'+12'</span>,
      <span class="json-key">"Views"</span>: <span class="json-string">"890"</span>
    }
  ],
  <span class="json-key">"timestamp"</span>: <span class="json-string">"2026-03-27T00:05:12Z"</span>
}</code></pre>`;
        runBtn3.textContent = 'DB Actualizada';
        runBtn3.style.opacity = '1';
        runBtn3.style.cursor = 'pointer';

        setTimeout(() => {
          isRunning3 = false;
          runBtn3.textContent = 'Re-iniciar Simulación';
        }, 2000);
      }, 3500);
    });
  }

  /* --- Simulation of Automation 4: AI Voice Ecosystem --- */
  const runBtn4 = document.getElementById('run-automation-btn-4');
  const terminalBody4 = document.getElementById('terminal-body-4');

  if (runBtn4 && terminalBody4) {
    let isRunning4 = false;
    let originalPayload4 = terminalBody4.innerHTML;

    runBtn4.addEventListener('click', () => {
      if (isRunning4) return;

      if (runBtn4.textContent === 'Re-iniciar Simulación') {
        terminalBody4.innerHTML = originalPayload4;
        runBtn4.textContent = 'Simular Fin de Llamada';
        return;
      }

      isRunning4 = true;
      runBtn4.style.opacity = '0.7';
      runBtn4.textContent = 'Recibiendo Webhooks...';
      runBtn4.style.cursor = 'wait';

      terminalBody4.innerHTML = '<span class="json-loading">> [Event] Llamada finalizada. Recibiendo webhooks en paralelo...<br>> [Hilo Audio] Descargando grabación .wav desde Cognitive Voice...</span>';

      setTimeout(() => {
        terminalBody4.innerHTML = '<span class="json-loading">> [Event] Llamada finalizada. Recibiendo webhooks en paralelo...<br>> [Hilo Audio] Descargando grabación .wav desde Cognitive Voice...<br>> [Hilo Data] Limpiando payload y extrayendo entidad (nombre: DAVID)...<br>> [Gemini AI] Ejecutando NLP (Validador de Intents y SPAM)...<br>> [Drive DB] Generando log completo de transcripción (DAVID_DMC.txt)...<br>> [Router] Lead cualificado como "AUTOMATIZACION". Empujando a ERP...</span>';
      }, 1500);

      setTimeout(() => {
        terminalBody4.innerHTML = `<pre><code class="language-json" style="color: #E6E6E6;">{
  <span class="json-key">"voice_agent_status"</span>: <span class="json-string">"END_OF_CALL_REPORT_PROCESSED"</span>,
  <span class="json-key">"archived_assets"</span>: {
    <span class="json-key">"audio"</span>: <span class="json-string">"2026-03-27_10-15-30.wav"</span>,
    <span class="json-key">"transcript"</span>: <span class="json-string">"DAVID_DMC_2026-03-27_CHAT.txt"</span>
  },
  <span class="json-key">"crm_record_created"</span>: {
    <span class="json-key">"nombre"</span>: <span class="json-string">"DAVID"</span>,
    <span class="json-key">"empresa"</span>: <span class="json-string">"DMC"</span>,
    <span class="json-key">"interes"</span>: <span class="json-string">"AUTOMATIZACION"</span>,
    <span class="json-key">"spam"</span>: <span class="json-boolean">false</span>
  }
}</code></pre>`;
        runBtn4.textContent = 'Ecosistema Orquestado';
        runBtn4.style.opacity = '1';
        runBtn4.style.cursor = 'pointer';

        setTimeout(() => {
          isRunning4 = false;
          runBtn4.textContent = 'Re-iniciar Simulación';
        }, 2000);
      }, 3500);
    });
  }

  /* --- Simulation of Automation 5: KYC Pipeline --- */
  const runBtn5 = document.getElementById('run-automation-btn-5');
  const terminalBody5 = document.getElementById('terminal-body-5');

  if (runBtn5 && terminalBody5) {
    let isRunning5 = false;
    let originalPayload5 = terminalBody5.innerHTML;

    runBtn5.addEventListener('click', () => {
      if (isRunning5) return;

      if (runBtn5.textContent === 'Re-iniciar Simulación') {
        terminalBody5.innerHTML = originalPayload5;
        runBtn5.textContent = 'Recibir Landing Webhook';
        return;
      }

      isRunning5 = true;
      runBtn5.style.opacity = '0.7';
      runBtn5.textContent = 'Procesando Landing...';
      runBtn5.style.cursor = 'wait';

      terminalBody5.innerHTML = '<span class="json-loading">> [Webhook] Recibiendo datos crudos desde formulario de colegio...<br>> [Make.com] Inyectando payload en GPT-5-Mini...</span>';

      setTimeout(() => {
        terminalBody5.innerHTML = '<span class="json-loading">> [Webhook] Recibiendo datos crudos desde formulario de colegio...<br>> [Make.com] Inyectando payload en GPT-5-Mini...<br>> [GPT-5 NLP] Normalizando número de teléfono (+34 600...)...<br>> [GPT-5 NLP] Extrayendo y formateando entidades: Tutor: José Mª García Vázquez | Alumno: Noa García...<br>> [GPT-5 NLP] Infiriendo géneros por contexto (Tutor: M | Alumno: F)...<br>> [Airtable] Cruzando base de datos y adjuntando autorización firmada...</span>';
      }, 1500);

      setTimeout(() => {
        terminalBody5.innerHTML = `<pre><code class="language-json" style="color: #E6E6E6;">{
  <span class="json-key">"kyc_status"</span>: <span class="json-string">"VALIDATION_SUCCESS"</span>,
  <span class="json-key">"normalized_entities"</span>: {
    <span class="json-key">"telefono"</span>: <span class="json-string">"600123456"</span>,
    <span class="json-key">"telefono_valido"</span>: <span class="json-boolean">true</span>,
    <span class="json-key">"tutor"</span>: {
      <span class="json-key">"nombre"</span>: <span class="json-string">"JOSE M"</span>,
      <span class="json-key">"apellidos"</span>: <span class="json-string">"GARCIA VAZQUEZ"</span>,
      <span class="json-key">"genero_inferido"</span>: <span class="json-string">"M"</span>
    },
    <span class="json-key">"alumno"</span>: {
      <span class="json-key">"nombre"</span>: <span class="json-string">"NOA"</span>,
      <span class="json-key">"apellidos"</span>: <span class="json-string">"GARCIA"</span>,
      <span class="json-key">"genero_inferido"</span>: <span class="json-string">"F"</span>
    }
  },
  <span class="json-key">"crm_action"</span>: <span class="json-string">"UPSERTED_IN_AIRTABLE"</span>
}</code></pre>`;
        runBtn5.textContent = 'Autorización Guardada';
        runBtn5.style.opacity = '1';
        runBtn5.style.cursor = 'pointer';

        setTimeout(() => {
          isRunning5 = false;
          runBtn5.textContent = 'Re-iniciar Simulación';
        }, 2000);
      }, 3500);
    });
  }

  /* --- Simulation of Automation 6: WhatsApp OCR Expense Tracker --- */
  const runBtn6 = document.getElementById('run-automation-btn-6');
  const terminalBody6 = document.getElementById('terminal-body-6');

  if (runBtn6 && terminalBody6) {
    let isRunning6 = false;
    let originalPayload6 = terminalBody6.innerHTML;

    runBtn6.addEventListener('click', () => {
      if (isRunning6) return;

      if (runBtn6.textContent === 'Re-iniciar Simulación') {
        terminalBody6.innerHTML = originalPayload6;
        runBtn6.textContent = 'Simular Envío WhatsApp (Foto)';
        return;
      }

      isRunning6 = true;
      runBtn6.style.opacity = '0.7';
      runBtn6.textContent = 'Analizando Imagen...';
      runBtn6.style.cursor = 'wait';

      terminalBody6.innerHTML = '<span class="json-loading">> [WhatsApp Event] Recibiendo mensaje multimedia...<br>> [Webhook] Trigger disparado. Obteniendo objeto binario .jpg...</span>';

      setTimeout(() => {
        terminalBody6.innerHTML = '<span class="json-loading">> [WhatsApp Event] Recibiendo mensaje multimedia...<br>> [Webhook] Trigger disparado. Obteniendo objeto binario .jpg...<br>> [GPT-4o Vision] Realizando OCR multimodal. Extrayendo CIF, Base Imponible e IVA...<br>> [Router] Ticket válido. Generando metadata taxonómica...<br>> [API Google Drive] Respaldando archivo en "Drive/Contabilidad/2026/Marzo"...<br>> [API Gmail] Redactando correo a contabilidad@empresa.com con datos extraídos...</span>';
      }, 1500);

      setTimeout(() => {
        terminalBody6.innerHTML = `<pre><code class="language-json" style="color: #E6E6E6;">{
  <span class="json-key">"workflow_status"</span>: <span class="json-string">"COMPLETED"</span>,
  <span class="json-key">"extracted_data"</span>: {
    <span class="json-key">"emisor"</span>: <span class="json-string">"RESTAURANTE EL MADRILEÑO, SL"</span>,
    <span class="json-key">"cif_emisor"</span>: <span class="json-string">"B-87654321"</span>,
    <span class="json-key">"fecha"</span>: <span class="json-string">"2026-03-27"</span>,
    <span class="json-key">"total_euros"</span>: <span class="json-number">56.50</span>,
    <span class="json-key">"iva_desglosado"</span>: {
      <span class="json-key">"base_imponible_10"</span>: <span class="json-number">51.36</span>,
      <span class="json-key">"cuota_10"</span>: <span class="json-number">5.14</span>
    }
  },
  <span class="json-key">"routed_to"</span>: {
    <span class="json-key">"archived_drivelink"</span>: <span class="json-string">"drive.google.com/file/d/1A2B3..."</span>,
    <span class="json-key">"email_sent_to"</span>: <span class="json-string">"contabilidad@empresa.com"</span>
  }
}</code></pre>`;
        runBtn6.textContent = 'Gasto Contabilizado';
        runBtn6.style.opacity = '1';
        runBtn6.style.cursor = 'pointer';

        setTimeout(() => {
          isRunning6 = false;
          runBtn6.textContent = 'Re-iniciar Simulación';
        }, 2000);
      }, 3500);
    });
  }

  /* --- Simulation of Automation 7: Smart Geocoding --- */
  const runBtn7 = document.getElementById('run-automation-btn-7');
  const terminalBody7 = document.getElementById('terminal-body-7');

  if (runBtn7 && terminalBody7) {
    let isRunning7 = false;
    let originalPayload7 = terminalBody7.innerHTML;

    runBtn7.addEventListener('click', () => {
      if (isRunning7) return;

      if (runBtn7.textContent === 'Re-iniciar Simulación') {
        terminalBody7.innerHTML = originalPayload7;
        runBtn7.textContent = 'Ejecutar Localizador';
        return;
      }

      isRunning7 = true;
      runBtn7.style.opacity = '0.7';
      runBtn7.textContent = 'Localizando...';
      runBtn7.style.cursor = 'wait';

      terminalBody7.innerHTML = '<span class="json-loading">> [DB] Cargando datos del cliente Javier Ruiz Martínez (ID: CLI-9928-X)...<br>> [Data] Normalizando dirección: C. de la Gran Vía, 28, 28013 Madrid, España...</span>';

      setTimeout(() => {
        terminalBody7.innerHTML = '<span class="json-loading">> [DB] Cargando datos del cliente Javier Ruiz Martínez (ID: CLI-9928-X)...<br>> [Data] Normalizando dirección: C. de la Gran Vía, 28, 28013 Madrid, España...<br>> [Google Maps API] Localizando dirección con alta precisión...<br>> [Verification] Validando integridad de coordenadas...<br>> [Sync] Preparando sincronización con el Mapa de Calor mensual (GitHub Hook)...</span>';
      }, 1500);

      setTimeout(() => {
        terminalBody7.innerHTML = `<pre><code class="language-json" style="color: #E6E6E6;">{
  <span class="json-key">"status"</span>: <span class="json-string">"LOCATION_SYNC_COMPLETE"</span>,
  <span class="json-key">"geolocalizacion"</span>: {
    <span class="json-key">"latitud"</span>: <span class="json-number">40.419827450392</span>,
    <span class="json-key">"longitud"</span>: <span class="json-number">-3.702956281045</span>,
    <span class="json-key">"api_source"</span>: <span class="json-string">"Google Maps API"</span>,
    <span class="json-key">"timestamp"</span>: <span class="json-string">"2026-03-30T11:58:30Z"</span>
  },
  <span class="json-key">"integracion_mapa"</span>: {
    <span class="json-key">"heatmap_synced"</span>: <span class="json-boolean">true</span>,
    <span class="json-key">"script_origen"</span>: <span class="json-string">"github.com/david/geotools-py"</span>,
    <span class="json-key">"proxima_ejecucion"</span>: <span class="json-string">"2026-04-01"</span>
  }
}</code></pre>`;
        runBtn7.textContent = 'Cliente Localizado';
        runBtn7.style.opacity = '1';
        runBtn7.style.cursor = 'pointer';

        setTimeout(() => {
          isRunning7 = false;
          runBtn7.textContent = 'Re-iniciar Simulación';
        }, 2000);
      }, 3500);
    });
  }

  /* --- Animación CTA (Reordenamiento de Letras Premium) --- */
  const ctaElement = document.getElementById('cta-text-anim');

  if (ctaElement) {
    class PremiumScramble {
      constructor(el) {
        this.el = el;
        // Letras que se usarán para el efecto de transición
        this.chars = 'abcdefghijklmnñopqrstuvwxyz';
        this.update = this.update.bind(this);
      }

      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = newText[i] || '';
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }

      update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];

          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            // Le damos un toque "Living Light" bajando la opacidad y difuminando un poco durante la transición
            output += `<span style="opacity: 0.4; filter: blur(1px);">${char}</span>`;
          } else {
            output += from;
          }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }

      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }

    // Las frases entre las que va a alternar
    const phrases = ['¿Creamos algo excepcional?', 'Conectemos'];
    const fx = new PremiumScramble(ctaElement);
    let counter = 1; // Empezamos yendo hacia "Conectemos"

    const nextPhrase = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(nextPhrase, 4000); // Se queda 4 segundos en pantalla antes de volver a cambiar
      });
      counter = (counter + 1) % phrases.length;
    };

    // Disparamos la animación cuando la sección sea visible en pantalla
    const ctaObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(nextPhrase, 800); // Espera 0.8s tras hacer scroll para iniciar el efecto
        ctaObserver.disconnect(); // Desconectamos para que el bucle se gestione solo
      }
    }, { threshold: 0.5 });

    ctaObserver.observe(ctaElement);
  }

});
