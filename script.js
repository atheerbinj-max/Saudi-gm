document.addEventListener("DOMContentLoaded", function() {
  const citiesData = {
    makkah: {
      title: "🕋 مكة المكرمة",
      desc: "مكة المكرمة قبلة المسلمين وأقدس بقاع الأرض.",
      background: "url('images/makkah.jpg')",
      quiz: [
        { question: "في أي سنة وُحدت المملكة العربية السعودية؟", options: ["1925", "1932", "1945"], answer: 1 },
        { question: "من أشهر الأكلات في مكة:", options: ["المطبق", "البيتزا", "البرجر"], answer: 0 },
        { question: "اللبس التقليدي في مكة:", options: ["الإحرام", "الكيمونو", "الساري"], answer: 0 },
      ],
    },
    alula: {
      title: "🏜️ العلا",
      desc: "العلا مدينة التاريخ والحضارات القديمة، موطن مدائن صالح.",
      background: "url('images/alula.jpg')",
      quiz: [
        { question: "إلى أي حضارة تعود مدائن صالح؟", options: ["الإغريق", "الأنباط", "الرومان"], answer: 1 },
        { question: "من الأكلات الشعبية في العلا:", options: ["الجريش", "السوشي", "الباستا"], answer: 0 },
        { question: "اللباس التقليدي في العلا:", options: ["الثوب النجدي", "البذلة الرسمية", "الكيمونو"], answer: 0 },
      ],
    },
    riyadh: {
      title: "🌆 الرياض",
      desc: "الرياض العاصمة الحديثة والمركز المالي والتجاري للمملكة.",
      background: "url('images/riyadh.jpg')",
      quiz: [
        { question: "ما اسم البرج الأشهر في الرياض؟", options: ["برج خليفة", "برج المملكة", "برج بيزا"], answer: 1 },
        { question: "من أشهر الأكلات في الرياض:", options: ["الكبسة", "السوشي", "البان كيك"], answer: 0 },
        { question: "اللباس التقليدي في الرياض:", options: ["الثوب الأبيض مع الشماغ", "الجينز والتيشيرت", "الساري"], answer: 0 },
      ],
    },
    aseer: {
      title: "🏔️ عسير",
      desc: "عسير أرض الجبال والضباب والفنون الشعبية.",
      background: "url('images/aseer.jpg')",
      quiz: [
        { question: "ما أبرز مهرجان في عسير؟", options: ["مهرجان كان", "مهرجان رجال ألمع", "مهرجان ريو"], answer: 1 },
        { question: "من الأكلات الشعبية في عسير:", options: ["الحنيذ", "الشاورما", "الباستا"], answer: 0 },
        { question: "اللباس التقليدي في عسير:", options: ["الثوب العسيري المطرز", "الجينز", "البذلة الرسمية"], answer: 0 },
      ],
    },
    east: {
      title: "🌊 المنطقة الشرقية",
      desc: "المنطقة الشرقية أرض النفط والبحر واللؤلؤ.",
      background: "url('images/east.jpg')",
      quiz: [
        { question: "ما أشهر مورد طبيعي في الشرقية؟", options: ["الذهب", "النفط", "الفضة"], answer: 1 },
        { question: "من الأكلات الشعبية في الشرقية:", options: ["السمك المشوي", "السوشي", "البرجر"], answer: 0 },
        { question: "اللباس التقليدي في الشرقية:", options: ["الدشداشة مع البشت", "البدلة الرياضية", "الكيمونو"], answer: 0 },
      ],
    }
  };

  const screens = {
    home: document.getElementById("screen-home"),
    select: document.getElementById("screen-select"),
    city: document.getElementById("screen-city"),
    end: document.getElementById("screen-end"),
    credit: document.getElementById("screen-credit"),
  };

  const startBtn = document.getElementById("start-btn");
  const cityButtons = document.querySelectorAll(".city-btn");
  const cityTitle = document.querySelector(".city-title");
  const cityDesc = document.querySelector(".city-desc");
  const quizContainer = document.querySelector(".quiz");
  const cityBg = document.querySelector(".city-bg");
  const backBtn = document.getElementById("back-to-select");
  const restartBtn = document.getElementById("restart-btn");
  const shareBtn = document.getElementById("share-btn");
  const creditBtn = document.getElementById("credit-btn");
  const creditBackBtn = document.getElementById("credit-back-btn");

  let currentCity = null;
  let currentQuestionIndex = 0;
  let score = 0;

  function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove("active"));
    screens[screenName].classList.add("active");
  }

  startBtn.addEventListener("click", function() {
    showScreen("select");
  });

  cityButtons.forEach(function(btn) {
    btn.addEventListener("click", function() {
      currentCity = btn.dataset.city;
      currentQuestionIndex = 0;
      score = 0;
      loadCityScreen(currentCity);
      showScreen("city");
    });
  });

  function loadCityScreen(cityKey) {
    const city = citiesData[cityKey];
    cityTitle.textContent = city.title;
    cityDesc.textContent = city.desc;
    cityBg.style.backgroundImage = city.background;

    loadQuestion();
  }

  function loadQuestion() {
    const city = citiesData[currentCity];
    if (currentQuestionIndex >= city.quiz.length) {
      showScreen("end");
      return;
    }

    const question = city.quiz[currentQuestionIndex];
    quizContainer.innerHTML = `
      <h3>${question.question}</h3>
      ${question.options.map(function(option, index) {
        return <button onclick="checkAnswer(${index})">${option}</button>;
      }).join('')}
    `;
  }

  window.checkAnswer = function(selectedIndex) {
    const city = citiesData[currentCity];
    const question = city.quiz[currentQuestionIndex];
    const buttons = quizContainer.querySelectorAll('button');

    buttons.forEach(function(btn) {
      btn.disabled = true;
    });

    if (selectedIndex === question.answer) {
      score++;
      buttons[selectedIndex].classList.add("correct");
    } else {
      buttons[selectedIndex].classList.add("wrong");
      buttons[question.answer].classList.add("correct");
    }

    setTimeout(function() {
      currentQuestionIndex++;
      if (currentQuestionIndex < city.quiz.length) {
        loadQuestion();
      } else {
        showScreen("end");
      }
    }, 1500);
  };

  backBtn.addEventListener("click", function() {
    showScreen("select");
  });

  restartBtn.addEventListener("click", function() {
    showScreen("home");
  });

  shareBtn.addEventListener("click", function() {
    alert("شارك رحلتك مع أصدقائك!");
    // يمكن إضافة كود المشاركة هنا
  });

  creditBtn.addEventListener("click", function() {
    showScreen("credit");
  });

  creditBackBtn.addEventListener("click", function() {
    showScreen("home");
  });
});
