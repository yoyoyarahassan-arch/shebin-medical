/* ═══════════════════════════════════════════════════════
   Shebin Medical Guide — Static Site App Layer v3
   Multi-category: Doctors, Hospitals, Pharmacies, Labs, Radiology, Emergency
   ═══════════════════════════════════════════════════════ */

(function(window) {
  'use strict';

  var CONFIG = {
    dataSource: 'supabase',
    supabase: {
      url: (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.url) ? window.SUPABASE_CONFIG.url : '',
      anonKey: (window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.anonKey) ? window.SUPABASE_CONFIG.anonKey : '',
      tableDoctors: 'doctors',
      tableSpecialties: 'specialties'
    },
    api: { baseUrl: '', doctorsEndpoint: '/doctors', specialtiesEndpoint: '/specialties' },
    perPage: 9
  };

  var SPECIALTIES = [
    { slug: 'باطنة', name: 'باطنة', emoji: '🩺' },
    { slug: 'قلب', name: 'قلب', emoji: '❤️' },
    { slug: 'سكر وغدد صماء', name: 'سكر وغدد صماء', emoji: '🍬' },
    { slug: 'كبد وجهاز هضمي', name: 'كبد وجهاز هضمي', emoji: '🧬' },
    { slug: 'صدر', name: 'صدر', emoji: '🫁' },
    { slug: 'جلدية', name: 'جلدية', emoji: '🧴' },
    { slug: 'أطفال', name: 'أطفال', emoji: '👶' },
    { slug: 'كلى ومسالك بولية', name: 'كلى ومسالك بولية', emoji: '🫘' },
    { slug: 'روماتيزم ومناعة', name: 'روماتيزم ومناعة', emoji: '🦴' },
    { slug: 'أمراض دم', name: 'أمراض دم', emoji: '🩸' },
    { slug: 'أورام', name: 'أورام', emoji: '🎗️' },
    { slug: 'نساء وتوليد', name: 'نساء وتوليد', emoji: '🤰' },
    { slug: 'عيون', name: 'عيون', emoji: '👁️' },
    { slug: 'أنف وأذن', name: 'أنف وأذن', emoji: '👂' },
    { slug: 'أسنان', name: 'أسنان', emoji: '🦷' },
    { slug: 'عظام', name: 'عظام', emoji: '🦴' },
    { slug: 'علاج طبيعي', name: 'علاج طبيعي', emoji: '🏃' },
    { slug: 'مخ وأعصاب', name: 'مخ وأعصاب', emoji: '🧠' },
    { slug: 'نفسية وعصبية', name: 'نفسية وعصبية', emoji: '🧘' },
    { slug: 'تخاطب', name: 'تخاطب', emoji: '🗣️' },
    { slug: 'مناظير', name: 'مناظير', emoji: '🧪' },
    { slug: 'جراحة عامة', name: 'جراحة عامة', emoji: '🏥' },
    { slug: 'جراحة عظام', name: 'جراحة عظام', emoji: '🦴' },
    { slug: 'جراحة مخ وأعصاب', name: 'جراحة مخ وأعصاب', emoji: '🧠' },
    { slug: 'جراحة أوعية دموية', name: 'جراحة أوعية دموية', emoji: '🩸' },
    { slug: 'جراحة تجميل', name: 'جراحة تجميل', emoji: '✨' },
    { slug: 'جراحة أورام', name: 'جراحة أورام', emoji: '🎗️' },
    { slug: 'تخصصات أخرى', name: 'تخصصات أخرى', emoji: '➕' }
  ];

  var CATEGORIES = [
    { slug: 'hospitals', name: 'المستشفيات', listName: 'المستشفيات', icon: 'local_hospital', label: 'مستشفى', color: '#dc2626', bg: '#fee2e2', emoji: '🏥' },
    { slug: 'pharmacies', name: 'الصيدليات', listName: 'الصيدليات', icon: 'local_pharmacy', label: 'صيدلية', color: '#7c3aed', bg: '#f3e8ff', emoji: '💊' },
    { slug: 'labs', name: 'معامل وتحاليل', listName: 'معامل التحاليل', icon: 'biotech', label: 'معمل تحاليل', color: '#0284c7', bg: '#e0f2fe', emoji: '🧪' },
    { slug: 'radiology', name: 'مراكز الأشعة', listName: 'مراكز الأشعة', icon: 'monitor_heart', label: 'مركز أشعة', color: '#059669', bg: '#d1fae5', emoji: '📡' },
    { slug: 'emergency', name: 'الطوارئ والإسعاف', listName: 'خدمات الطوارئ', icon: 'emergency', label: 'طوارئ وإسعاف', color: '#dc2626', bg: '#fff1f2', emoji: '🚨' }
  ];

  var DEMO_DOCTORS = [
    { id:'1', slug:'ahmed-mahmoud-hassan', name:'د. أحمد محمود حسن', subtitle:'استشاري الباطنة العامة والجهاز الهضمي', specialty:'باطنة', services:'كشف باطنة - متابعة أمراض مزمنة - مناظير الجهاز الهضمي', address:'شارع الجيش، أمام مستشفى شبين الكوم التعليمي، شبين الكوم', phones:['+201012345678','0482222333'], hours:'يومياً من 5 مساءً حتى 10 مساءً — ماعدا الجمعة', image:'', gender:'دكتور', tags:['باطنة','جهاز هضمي'] },
    { id:'2', slug:'fatma-elsayed-ali', name:'د. فاطمة السيد علي', subtitle:'أخصائية طب الأطفال وحديثي الولادة', specialty:'أطفال', services:'كشف أطفال - متابعة نمو - تطعيمات - حديثي ولادة', address:'شارع ناصر، بجوار صيدلية الشفاء، شبين الكوم', phones:['+201098765432'], hours:'السبت - الخميس: 4 عصراً - 9 مساءً', image:'', gender:'دكتورة', tags:['أطفال','حديثي ولادة'] },
    { id:'3', slug:'mohamed-abdallah-ibrahim', name:'د. محمد عبدالله إبراهيم', subtitle:'استشاري جراحة العظام والمفاصل', specialty:'عظام', services:'جراحة عظام - مفاصل صناعية - كسور - إصابات رياضية', address:'ميدان الساعة، شبين الكوم، المنوفية', phones:['+201155667788','+201155667799'], hours:'يومياً ماعدا الجمعة: 3 عصراً - 8 مساءً', image:'', gender:'دكتور', tags:['عظام','مفاصل','كسور'] },
    { id:'4', slug:'noura-hussein-abdelrahman', name:'د. نورا حسين عبدالرحمن', subtitle:'أخصائية أمراض النساء والتوليد', specialty:'نساء وتوليد', services:'متابعة حمل - ولادة طبيعية وقيصرية - علاج تأخر إنجاب', address:'شارع طلعت حرب، بجوار مسجد الفتح، شبين الكوم', phones:['+201234567890'], hours:'السبت - الأربعاء: 5 مساءً - 9 مساءً', image:'', gender:'دكتورة', tags:['نساء وتوليد','حمل'] },
    { id:'5', slug:'khaled-saeed-mohamed', name:'د. خالد سعيد محمد', subtitle:'استشاري طب وجراحة العيون', specialty:'عيون', services:'كشف عيون - عمليات مياه بيضاء - ليزك - قاع عين', address:'شارع الجلاء، أمام بنك مصر، شبين الكوم', phones:['+201177889900'], hours:'يومياً: 10 صباحاً - 2 ظهراً / 6 مساءً - 10 مساءً', image:'', gender:'دكتور', tags:['عيون','ليزك'] },
    { id:'6', slug:'sara-ahmed-almansi', name:'د. سارة أحمد المنسي', subtitle:'أخصائية الأمراض الجلدية والتجميل', specialty:'جلدية', services:'أمراض جلدية - تجميل - ليزر - فيلر وبوتكس', address:'شارع سعد زغلول، الدور الثالث، عمارة النور، شبين الكوم', phones:['+201033445566'], hours:'السبت - الخميس: 4 عصراً - 9 مساءً', image:'', gender:'دكتورة', tags:['جلدية','تجميل','ليزر'] },
    { id:'7', slug:'amr-mostafa-elsayed', name:'د. عمرو مصطفى السيد', subtitle:'استشاري أمراض القلب والأوعية الدموية', specialty:'قلب', services:'رسم قلب - إيكو - قسطرة تشخيصية - دعامات', address:'شارع الجيش، بجوار مستشفى القلب، شبين الكوم', phones:['+201199887766','0482334455'], hours:'يومياً: 6 مساءً - 10 مساءً', image:'', gender:'دكتور', tags:['قلب','أوعية دموية'] },
    { id:'8', slug:'heba-mahmoud-abdelaziz', name:'د. هبة محمود عبدالعزيز', subtitle:'أخصائية أنف وأذن وحنجرة', specialty:'أنف وأذن', services:'أمراض أنف وأذن - لوز ولحمية - حساسية - سمعيات', address:'شارع المستشفى العام، شبين الكوم', phones:['+201066778899'], hours:'الأحد - الخميس: 5 مساءً - 9 مساءً', image:'', gender:'دكتورة', tags:['أنف وأذن','حنجرة'] },
    { id:'9', slug:'yaser-hamdi-elsharif', name:'د. ياسر حمدي الشريف', subtitle:'استشاري المخ والأعصاب', specialty:'مخ وأعصاب', services:'صداع مزمن - صرع - أعصاب طرفية - رسم مخ', address:'ميدان المحطة، شبين الكوم', phones:['+201288990011'], hours:'يومياً ماعدا الجمعة: 4 عصراً - 8 مساءً', image:'', gender:'دكتور', tags:['مخ','أعصاب'] },
    { id:'10', slug:'rania-mohamed-othman', name:'د. رانيا محمد عثمان', subtitle:'أخصائية سكر وغدد صماء', specialty:'سكر وغدد صماء', services:'سكر من النوع الأول والثاني - غدة درقية - هرمونات', address:'شارع بورسعيد، فوق صيدلية العزبي، شبين الكوم', phones:['+201144556677'], hours:'السبت - الأربعاء: 3 عصراً - 8 مساءً', image:'', gender:'دكتورة', tags:['سكر','غدد صماء'] },
    { id:'11', slug:'hossam-eldin-ali', name:'د. حسام الدين علي', subtitle:'أخصائي طب الأسنان والتجميل', specialty:'أسنان', services:'حشو وتركيبات - زراعة أسنان - تقويم - تبييض', address:'شارع الحرية، الدور الأول، شبين الكوم', phones:['+201022334455'], hours:'يومياً: 12 ظهراً - 10 مساءً', image:'', gender:'دكتور', tags:['أسنان','تجميل أسنان'] },
    { id:'12', slug:'mariam-abdelfattah', name:'د. مريم عبدالفتاح', subtitle:'أخصائية علاج طبيعي وتأهيل', specialty:'علاج طبيعي', services:'علاج طبيعي - تأهيل إصابات - آلام الظهر والرقبة', address:'شارع الجمهورية، بجوار النادي الرياضي، شبين الكوم', phones:['+201277889900'], hours:'يومياً ماعدا الجمعة: 10 صباحاً - 6 مساءً', image:'', gender:'دكتورة', tags:['علاج طبيعي','تأهيل'] }
  ];

  var DEMO_ENTITIES = {
    hospitals: [
      { id:'h1', slug:'shibin-teaching-hospital', name:'مستشفى شبين الكوم التعليمي', subtitle:'مستشفى حكومي جامعي — خدمات شاملة', category:'hospitals', services:'طوارئ 24 ساعة - باطنة - جراحة عامة - نساء وتوليد - أطفال - عيون - أنف وأذن وحنجرة - جلدية - أورام - رعاية مركزة - غسيل كلى', address:'شارع الجيش، شبين الكوم، المنوفية', phones:['048-2220000','048-2221000'], hours:'خدمة 24 ساعة — 7 أيام في الأسبوع', image:'', tags:['حكومي','تعليمي','طوارئ','شامل'] },
      { id:'h2', slug:'menofia-university-hospital', name:'مستشفى جامعة المنوفية', subtitle:'مستشفى جامعي تخصصي', category:'hospitals', services:'جميع التخصصات - وحدات عناية مركزة - غرف عمليات متطورة - طوارئ - جراحات دقيقة', address:'شارع ناصر، شبين الكوم، المنوفية', phones:['048-2220100'], hours:'خدمة 24 ساعة', image:'', tags:['جامعي','تخصصي'] },
      { id:'h3', slug:'nile-hospital', name:'مستشفى النيل الخاص', subtitle:'مستشفى خاص متخصص في الجراحات', category:'hospitals', services:'جراحة عامة - نساء وتوليد - عظام - قلب - رعاية مركزة - عمليات مناظير', address:'شارع النيل، شبين الكوم', phones:['048-2235555'], hours:'خدمة 24 ساعة', image:'', tags:['خاص','جراحة'] },
      { id:'h4', slug:'rescue-hospital', name:'مستشفى الإنقاذ الدولي', subtitle:'مستشفى خاص متكامل', category:'hospitals', services:'طوارئ - جراحة عامة وتخصصية - باطنة - أطفال - نساء وتوليد - رعاية مركزة', address:'ميدان الساعة، شبين الكوم', phones:['048-2236666'], hours:'24 ساعة', image:'', tags:['خاص','طوارئ'] },
      { id:'h5', slug:'arab-hospital', name:'المستشفى العربي', subtitle:'مستشفى خاص', category:'hospitals', services:'باطنة - جراحة عامة - أطفال - رعاية مركزة - وحدة غسيل كلى', address:'شارع الجمهورية، شبين الكوم', phones:['048-2237777'], hours:'24 ساعة', image:'', tags:['خاص'] }
    ],
    pharmacies: [
      { id:'p1', slug:'shifa-pharmacy', name:'صيدلية الشفاء', subtitle:'صيدلية متكاملة — توصيل منزلي', category:'pharmacies', services:'أدوية كاملة - مستلزمات طبية - مستحضرات تجميل - توصيل منزلي - مستلزمات أطفال - أجهزة منزلية', address:'شارع ناصر، بجوار عيادة الأطفال، شبين الكوم', phones:['01012345000'], hours:'24 ساعة يومياً', image:'', tags:['24 ساعة','توصيل','متكاملة'] },
      { id:'p2', slug:'ezabi-pharmacy', name:'صيدلية العزبي', subtitle:'سلسلة صيدليات موثوقة', category:'pharmacies', services:'أدوية - فيتامينات وبروتينات - مستحضرات تجميل - قياس ضغط وسكر مجاناً', address:'شارع بورسعيد، شبين الكوم', phones:['01098765000'], hours:'8 صباحاً — 12 منتصف الليل', image:'', tags:['موثوق','سلسلة'] },
      { id:'p3', slug:'noor-pharmacy', name:'صيدلية النور', subtitle:'خدمة 24 ساعة — طلب عبر الهاتف', category:'pharmacies', services:'أدوية - مستلزمات طبية - أجهزة قياس منزلية - توصيل سريع', address:'شارع الحرية، شبين الكوم', phones:['01155667000'], hours:'24 ساعة', image:'', tags:['24 ساعة','توصيل'] },
      { id:'p4', slug:'seha-pharmacy', name:'صيدلية الصحة', subtitle:'متخصصة في الأمراض المزمنة', category:'pharmacies', services:'أدوية مزمنة - أدوية السكر والضغط - قياس سكر ودم مجاناً - مستلزمات مرضى السكر', address:'شارع طلعت حرب، شبين الكوم', phones:['01234567000'], hours:'8 صباحاً — 11 مساءً', image:'', tags:['أمراض مزمنة','سكر'] },
      { id:'p5', slug:'magdi-pharmacy', name:'صيدلية ماجدي', subtitle:'صيدلية محلية متميزة', category:'pharmacies', services:'أدوية - مستلزمات - فيتامينات - منتجات طبيعية وعشبية', address:'شارع سعد زغلول، شبين الكوم', phones:['01177889000'], hours:'9 صباحاً — 12 منتصف الليل', image:'', tags:[] }
    ],
    labs: [
      { id:'l1', slug:'central-lab', name:'المعمل المركزي', subtitle:'تحاليل طبية شاملة — نتائج دقيقة', category:'labs', services:'تحاليل دم كاملة - هرمونات - وظائف كبد وكلى - ثقافات جرثومية - PCR - فيروسات كبدية - أورام - سكر وأنيميا', address:'شارع الجيش، بجوار مستشفى شبين الكوم التعليمي', phones:['048-2230000','01099887000'], hours:'يومياً: 7 صباحاً — 8 مساءً', image:'', tags:['شامل','دقيق','PCR'] },
      { id:'l2', slug:'perfect-lab', name:'معمل بيرفكت', subtitle:'معمل تحاليل متخصص في الهرمونات', category:'labs', services:'تحاليل هرمونات - حساسية - متابعة حمل - DNA - تحاليل خاصة ونادرة', address:'شارع ناصر، شبين الكوم', phones:['048-2240000'], hours:'يومياً: 8 صباحاً — 6 مساءً', image:'', tags:['هرمونات','حمل','DNA'] },
      { id:'l3', slug:'pioneer-lab', name:'معمل بايونير', subtitle:'معمل طبي معتمد', category:'labs', services:'تحاليل طبية شاملة - صور دم - وظائف كلى وكبد - سكر - دهون - بروتينات', address:'ميدان المحطة، شبين الكوم', phones:['01012300000'], hours:'يومياً: 7 صباحاً — 9 مساءً', image:'', tags:['معتمد','شامل'] },
      { id:'l4', slug:'diagnostic-lab', name:'معمل دايجنوستيك', subtitle:'تشخيص دقيق — نتائج سريعة', category:'labs', services:'تحاليل طبية شاملة - نتائج سريعة - خدمة طلب منزلي - PCR وكورونا', address:'شارع الجلاء، شبين الكوم', phones:['01155600000'], hours:'يومياً ماعدا الجمعة: 8 صباحاً — 5 مساءً', image:'', tags:['سريع','منزلي','PCR'] },
      { id:'l5', slug:'shifaa-lab', name:'معمل الشفاء للتحاليل', subtitle:'معمل طبي متكامل', category:'labs', services:'تحاليل شاملة - ثقافات جرثومية - تعداد دم كامل - كيمياء - هرمونات', address:'شارع بورسعيد، شبين الكوم', phones:['048-2241000'], hours:'8 صباحاً — 8 مساءً', image:'', tags:['متكامل'] }
    ],
    radiology: [
      { id:'r1', slug:'nour-radiology', name:'مركز نور للأشعة', subtitle:'أشعة — سونار — رنين مغناطيسي — CT', category:'radiology', services:'أشعة سينية - سونار بطن وحوض - سونار نساء وتوليد - سونار قلب - CT Scan - رنين مغناطيسي MRI - ماموجرام', address:'شارع الجيش، أمام المستشفى التعليمي، شبين الكوم', phones:['048-2250000','01099877000'], hours:'يومياً: 9 صباحاً — 9 مساءً', image:'', tags:['CT','رنين','سونار','ماموجرام'] },
      { id:'r2', slug:'diagnostic-center', name:'مركز الشبين للتشخيص', subtitle:'مركز أشعة متكامل', category:'radiology', services:'سونار - CT Scan - أشعة سينية عادية - إيكو قلب - دوبلر وأوعية', address:'شارع النيل، شبين الكوم', phones:['048-2251000'], hours:'يومياً: 10 صباحاً — 10 مساءً', image:'', tags:['CT','إيكو','دوبلر'] },
      { id:'r3', slug:'scan-center', name:'مركز سكان الطبي', subtitle:'أشعة حديثة — تقنيات متطورة', category:'radiology', services:'MRI رنين مغناطيسي - CT بالتباين - أشعة سينية - سونار أنواع - إيكو قلب', address:'ميدان الساعة، شبين الكوم', phones:['01012311000'], hours:'9 صباحاً — 11 مساءً', image:'', tags:['MRI','CT','متطور'] },
      { id:'r4', slug:'elite-radiology', name:'إيليت للأشعة', subtitle:'أشعة متطورة وسريعة النتيجة', category:'radiology', services:'سونار - كثافة عظام - CT Scan - أشعة سينية - ماموجرام رقمي', address:'شارع الحرية، شبين الكوم', phones:['01155611000'], hours:'يومياً ماعدا الأحد: 10 صباحاً — 9 مساءً', image:'', tags:['كثافة عظام','ماموجرام'] },
      { id:'r5', slug:'star-ultrasound', name:'مركز ستار للسونار', subtitle:'متخصص في السونار والأشعة الصوتية', category:'radiology', services:'سونار نساء وتوليد - سونار بطن وكبد - سونار قلب - سونار رقبة وغدة درقية - دوبلر', address:'شارع طلعت حرب، شبين الكوم', phones:['01234560000'], hours:'9 صباحاً — 8 مساءً', image:'', tags:['سونار','نساء','غدة درقية'] }
    ],
    emergency: [
      { id:'e1', slug:'ambulance-123', name:'خدمة الإسعاف المصري 123', subtitle:'إسعاف حكومي مجاني — خط طوارئ', category:'emergency', services:'نقل مرضى طوارئ - إسعاف فوري على مدار الساعة - طواقم طبية متخصصة - أجهزة إنعاش - نقل بين المستشفيات', address:'مركز الإسعاف، شبين الكوم، المنوفية', phones:['123'], hours:'خدمة 24 ساعة — 7 أيام أسبوعياً', image:'', tags:['مجاني','حكومي','طوارئ','إسعاف'] },
      { id:'e2', slug:'police-122', name:'خدمة الطوارئ الشرطية 122', subtitle:'طوارئ وأمن — خط مجاني', category:'emergency', services:'بلاغات الطوارئ - حوادث الطرق - أمن المواطن - تنسيق مع الإسعاف', address:'قسم شرطة شبين الكوم', phones:['122'], hours:'خدمة 24 ساعة', image:'', tags:['مجاني','شرطة','طوارئ'] },
      { id:'e3', slug:'fire-180', name:'الإطفاء والإنقاذ 180', subtitle:'طوارئ حرائق وإنقاذ — مجاني', category:'emergency', services:'إخماد حرائق - إنقاذ منكوبين - حوادث غاز - طوارئ', address:'مركز الإطفاء، شبين الكوم', phones:['180'], hours:'خدمة 24 ساعة', image:'', tags:['مجاني','حرائق','إنقاذ'] },
      { id:'e4', slug:'private-ambulance', name:'إسعاف النجاة الخاص', subtitle:'إسعاف خاص متخصص ومجهز', category:'emergency', services:'نقل مرضى محلياً وبين المحافظات - أطقم طبية مدربة - سيارات مجهزة بالأكسجين والإنعاش - نقل مكثف', address:'شارع الجيش، شبين الكوم', phones:['01012399999'], hours:'24 ساعة يومياً', image:'', tags:['خاص','مجهز','نقل بين محافظات'] },
      { id:'e5', slug:'hospital-emergency', name:'طوارئ المستشفى التعليمي', subtitle:'قسم الطوارئ الرئيسي — شبين الكوم', category:'emergency', services:'طوارئ داخلية وجراحية - إنعاش قلب ورئة - حوادث وإصابات - طوارئ أطفال - طوارئ نساء وتوليد', address:'شارع الجيش، المستشفى التعليمي، شبين الكوم', phones:['048-2220000'], hours:'24 ساعة يومياً', image:'', tags:['حكومي','إنعاش','شامل'] }
    ]
  };

  var DataLayer = {
    getDoctors: function(f) {
      if (CONFIG.dataSource === 'supabase') return this._supabaseGetDoctors(f);
      if (CONFIG.dataSource === 'api') return this._apiGetDoctors(f);
      return this._demoGetDoctors(f);
    },
    getDoctor: function(id) {
      if (CONFIG.dataSource === 'supabase') return this._supabaseGetDoctor(id);
      if (CONFIG.dataSource === 'api') return this._apiGetDoctor(id);
      return this._demoGetDoctor(id);
    },
    getEntities: function(category, filters) {
      return this._demoGetEntities(category, filters);
    },
    getEntity: function(id) {
      return this._demoGetEntity(id);
    },
    _demoGetEntities: function(category, filters) {
      return new Promise(function(resolve) {
        var all = (DEMO_ENTITIES[category] || []).slice();
        if (filters && filters.q) {
          var q = filters.q.toLowerCase();
          all = all.filter(function(e) {
            return e.name.toLowerCase().indexOf(q) !== -1 ||
                   (e.subtitle && e.subtitle.toLowerCase().indexOf(q) !== -1) ||
                   (e.services && e.services.toLowerCase().indexOf(q) !== -1);
          });
        }
        var page = (filters && filters.page) || 1;
        var total = all.length;
        var start = (page - 1) * CONFIG.perPage;
        resolve({ items: all.slice(start, start + CONFIG.perPage), total: total, page: page, totalPages: Math.ceil(total / CONFIG.perPage) });
      });
    },
    _demoGetEntity: function(id) {
      return new Promise(function(resolve, reject) {
        var cats = Object.keys(DEMO_ENTITIES);
        for (var ci = 0; ci < cats.length; ci++) {
          var cat = DEMO_ENTITIES[cats[ci]];
          for (var ei = 0; ei < cat.length; ei++) {
            if (cat[ei].id === id || cat[ei].slug === id) {
              resolve(cat[ei]);
              return;
            }
          }
        }
        reject(new Error('Entity not found: ' + id));
      });
    },
    _demoGetDoctors: function(filters) {
      return new Promise(function(resolve) {
        var results = DEMO_DOCTORS.slice();
        if (filters.q) {
          var q = filters.q.toLowerCase();
          results = results.filter(function(d) {
            return d.name.toLowerCase().indexOf(q) !== -1 ||
              (d.subtitle && d.subtitle.toLowerCase().indexOf(q) !== -1);
          });
        }
        if (filters.specialty) results = results.filter(function(d) {
          return d.specialty === filters.specialty || (d.tags && d.tags.indexOf(filters.specialty) !== -1);
        });
        if (filters.gender) results = results.filter(function(d) {
          return d.name.indexOf(filters.gender) !== -1 || d.gender === filters.gender;
        });
        var page = filters.page || 1, total = results.length, start = (page - 1) * CONFIG.perPage;
        resolve({ doctors: results.slice(start, start + CONFIG.perPage), total: total, page: page, totalPages: Math.ceil(total / CONFIG.perPage) });
      });
    },
    _demoGetDoctor: function(id) {
      return new Promise(function(resolve, reject) {
        var sid = String(id), found = null;
        for (var i = 0; i < DEMO_DOCTORS.length; i++) {
          var d = DEMO_DOCTORS[i];
          if (d.id === sid || d.slug === sid || d.name === sid) {
            found = d;
            break;
          }
        }
        if (!found) {
          for (var j = 0; j < DEMO_DOCTORS.length; j++) {
            if (DEMO_DOCTORS[j].slug && DEMO_DOCTORS[j].slug.indexOf(sid) !== -1) {
              found = DEMO_DOCTORS[j];
              break;
            }
          }
        }
        if (found) resolve(found);
        else reject(new Error('Doctor not found: ' + id));
      });
    },
    _supabaseHeaders: function() {
      return {
        'apikey': CONFIG.supabase.anonKey,
        'Authorization': 'Bearer ' + CONFIG.supabase.anonKey,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
      };
    },
    _supabaseNormalizeDoctor: function(doc) {
      var normalized = Object.assign({}, doc || {});
      normalized.name = normalized.name || '';
      normalized.specialty = normalized.specialty || '';
      normalized.subtitle = normalized.subtitle || normalized.specialty || '';
      normalized.services = normalized.services || normalized.subtitle || normalized.specialty || '';
      normalized.address = normalized.address || '';

      if (Array.isArray(normalized.phones)) {
        normalized.phones = normalized.phones;
      } else if (typeof normalized.phones === 'string' && normalized.phones.trim()) {
        normalized.phones = normalized.phones.split(/[,،\n/|-]+/).map(function(p) {
          return p.trim();
        }).filter(Boolean);
      } else {
        normalized.phones = [];
      }

      if (Array.isArray(normalized.tags)) {
        normalized.tags = normalized.tags;
      } else if (typeof normalized.tags === 'string' && normalized.tags.trim()) {
        normalized.tags = normalized.tags.split(/[,،]+/).map(function(t) {
          return t.trim();
        }).filter(Boolean);
      } else if (normalized.specialty) {
        normalized.tags = [normalized.specialty];
      } else {
        normalized.tags = [];
      }

      normalized.image = normalized.image || '';
      normalized.gender = normalized.gender || '';
      normalized.hours = normalized.hours || '';
      normalized.slug = normalized.slug || '';

      return normalized;
    },
    _supabaseGetDoctors: function(filters) {
      var url = CONFIG.supabase.url + '/rest/v1/' + CONFIG.supabase.tableDoctors, params = [];

      if (filters.q) {
        params.push('name=ilike.*' + encodeURIComponent(filters.q) + '*');
      }
      if (filters.specialty) {
        params.push('specialty=eq.' + encodeURIComponent(filters.specialty));
      }

      var page = filters.page || 1, offset = (page - 1) * CONFIG.perPage;
      params.push('limit=' + CONFIG.perPage, 'offset=' + offset, 'order=name.asc');

      if (params.length) url += '?' + params.join('&');

      var self = this;
      return fetch(url, { headers: this._supabaseHeaders() }).then(function(res) {
        var total = parseInt((res.headers.get('content-range') || '').split('/')[1] || '0', 10);
        return res.json().then(function(data) {
          data = Array.isArray(data) ? data.map(function(doc) {
            return self._supabaseNormalizeDoctor(doc);
          }) : [];
          return {
            doctors: data,
            total: total,
            page: page,
            totalPages: Math.ceil(total / CONFIG.perPage)
          };
        });
      });
    },
    _supabaseGetDoctor: function(id) {
      var self = this;
      return fetch(
        CONFIG.supabase.url + '/rest/v1/' + CONFIG.supabase.tableDoctors + '?id=eq.' + encodeURIComponent(id),
        { headers: this._supabaseHeaders() }
      )
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d && d.length) return self._supabaseNormalizeDoctor(d[0]);
        throw new Error('not found');
      });
    },
    _apiGetDoctors: function(filters) {
      var url = CONFIG.api.baseUrl + CONFIG.api.doctorsEndpoint, p = new URLSearchParams();
      if (filters.q) p.set('q', filters.q);
      if (filters.specialty) p.set('specialty', filters.specialty);
      if (filters.gender) p.set('gender', filters.gender);
      p.set('page', filters.page || 1);
      p.set('limit', CONFIG.perPage);
      return fetch(url + '?' + p.toString()).then(function(r) {
        return r.json();
      }).then(function(data) {
        return {
          doctors: data.data || data.doctors || data,
          total: data.total || 0,
          page: data.page || filters.page || 1,
          totalPages: data.totalPages || Math.ceil((data.total || 0) / CONFIG.perPage)
        };
      });
    },
    _apiGetDoctor: function(id) {
      return fetch(CONFIG.api.baseUrl + CONFIG.api.doctorsEndpoint + '/' + encodeURIComponent(id)).then(function(r) {
        return r.json();
      });
    }
  };

  function escHtml(s) {
    if (!s) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function normPhone(raw) {
    if (!raw) return null;
    var v = String(raw).replace(/[^\d+]/g, '');
    if (!v || v.length < 3 || v.length > 15) return null;
    if (/^01[0-9]{9}$/.test(v)) return '+2' + v;
    if (/^\+/.test(v)) return v;
    return v;
  }

  function initMobileMenu() {
    var btn = document.getElementById('smgMenuBtn'),
        nav = document.getElementById('smgNav'),
        overlay = document.getElementById('smgMenuOverlay');

    if (!btn || !nav) return;

    function toggle() {
      nav.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
      var o = nav.classList.contains('open');
      btn.querySelector('.material-icons-round').textContent = o ? 'close' : 'menu';
      btn.setAttribute('aria-expanded', o);
    }

    function close() {
      nav.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      btn.querySelector('.material-icons-round').textContent = 'menu';
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', toggle);
    if (overlay) overlay.addEventListener('click', close);
    nav.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', close); });
  }

  var SMG = {};

  SMG.getCategoryMeta = function(slug) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].slug === slug) return CATEGORIES[i];
    }
    return { slug: slug, name: slug, listName: slug, icon: 'medical_services', label: slug, color: '#008080', bg: '#f0fdfa', emoji: '🏥' };
  };

  SMG.populateSearchDropdown = function(selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;

    var docGroup = document.createElement('optgroup');
    docGroup.label = 'الأطباء — اختر التخصص';
    SPECIALTIES.forEach(function(s) {
      var o = document.createElement('option');
      o.value = 's:' + s.slug;
      o.textContent = s.name;
      docGroup.appendChild(o);
    });
    sel.appendChild(docGroup);

    var catGroup = document.createElement('optgroup');
    catGroup.label = '— خدمات طبية أخرى —';
    CATEGORIES.forEach(function(c) {
      var o = document.createElement('option');
      o.value = 'c:' + c.slug;
      o.textContent = c.name;
      catGroup.appendChild(o);
    });
    sel.appendChild(catGroup);
  };

  SMG.populateSpecialtyDropdown = function(selectId) {
    var sel = document.getElementById(selectId);
    if (!sel) return;
    SPECIALTIES.forEach(function(s) {
      var o = document.createElement('option');
      o.value = s.slug;
      o.textContent = s.name;
      sel.appendChild(o);
    });
  };

  SMG.handleHeroSearch = function(q, val) {
    if (!val) {
      window.location.href = './doctors.html' + (q ? '?q=' + encodeURIComponent(q) : '');
      return;
    }

    if (val.indexOf('c:') === 0) {
      var cat = val.slice(2);
      var href = './listing.html?category=' + encodeURIComponent(cat);
      if (q) href += '&q=' + encodeURIComponent(q);
      window.location.href = href;
    } else {
      var spec = val.indexOf('s:') === 0 ? val.slice(2) : val;
      var params = [];
      if (spec) params.push('specialty=' + encodeURIComponent(spec));
      if (q) params.push('q=' + encodeURIComponent(q));
      window.location.href = './doctors.html' + (params.length ? '?' + params.join('&') : '');
    }
  };

  SMG.renderSpecialtiesGrid = function(containerId) {
    var el = document.getElementById(containerId);
    if (!el) return;
    var html = '';
    SPECIALTIES.forEach(function(s) {
      html += '<a class="smg-spec-page-card" href="./doctors.html?specialty=' + encodeURIComponent(s.slug) + '">'
           + '<div class="ico-wrap"><span aria-hidden="true" class="smg-emoji">' + s.emoji + '</span></div>'
           + '<h3>' + escHtml(s.name) + '</h3>'
           + '</a>';
    });
    el.innerHTML = html;
  };

  SMG.renderDoctorsGrid = function(gridId, paginationId, filters) {
    var gridEl = document.getElementById(gridId),
        pagEl = document.getElementById(paginationId);

    if (!gridEl) return;

    gridEl.innerHTML = '<div class="smg-loading">جارٍ تحميل البيانات...</div>';

    DataLayer.getDoctors(filters).then(function(result) {
      if (!result.doctors || result.doctors.length === 0) {
        gridEl.innerHTML = '<p class="no-results">لا توجد نتائج. جرّب البحث بكلمات مختلفة.</p>';
        if (pagEl) pagEl.innerHTML = '';
        return;
      }

      var html = '';
      result.doctors.forEach(function(doc) {
        var imgHtml = doc.image
          ? '<img alt="' + escHtml(doc.name) + '" class="smg-card-img" src="' + escHtml(doc.image) + '" loading="lazy">'
          : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#e0f2fe;color:#008080;font-weight:800;font-size:48px">د</div>';

        html += '<a class="smg-doctor-card" href="./doctor.html?id=' + encodeURIComponent(doc.id) + '">'
             + '<div class="smg-doctor-card-img-wrap">' + imgHtml + '</div>'
             + '<div class="smg-doctor-card-body">'
             + '<h3>' + escHtml(doc.name) + '</h3>'
             + (doc.specialty ? '<div class="spec">' + escHtml(doc.specialty) + '</div>' : '')
             + '<div class="location"><span class="material-icons-round" style="font-size:16px">location_on</span> <span>' + escHtml(doc.address || 'شبين الكوم') + '</span></div>'
             + '<span class="smg-btn-detail">عرض التفاصيل <span class="material-icons-round" style="font-size:16px">visibility</span></span>'
             + '</div></a>';
      });

      gridEl.innerHTML = html;

      if (pagEl && result.totalPages > 1) {
        var phtml = '', cp = result.page, tp = result.totalPages;
        if (cp > 1) phtml += '<a onclick="SMG.goToPage(' + (cp - 1) + ')" title="السابق"><span class="material-icons-round">chevron_right</span></a>';
        for (var p = 1; p <= tp; p++) {
          phtml += p === cp ? '<span class="current">' + p + '</span>' : '<a onclick="SMG.goToPage(' + p + ')">' + p + '</a>';
        }
        if (cp < tp) phtml += '<a onclick="SMG.goToPage(' + (cp + 1) + ')" title="التالي"><span class="material-icons-round">chevron_left</span></a>';
        pagEl.innerHTML = phtml;
      } else if (pagEl) {
        pagEl.innerHTML = '';
      }
    }).catch(function(err) {
      gridEl.innerHTML = '<p class="no-results">حدث خطأ أثناء تحميل البيانات.</p>';
      console.error('[SMG]', err);
    });
  };

  SMG.goToPage = function(page) {
    var p = new URLSearchParams(window.location.search);
    p.set('page', page);
    window.location.search = p.toString();
  };

  SMG.renderEntitiesGrid = function(gridId, paginationId, category, filters) {
    var gridEl = document.getElementById(gridId), pagEl = document.getElementById(paginationId);
    if (!gridEl) return;
    var meta = SMG.getCategoryMeta(category);
    gridEl.innerHTML = '<div class="smg-loading">جارٍ تحميل البيانات...</div>';

    DataLayer.getEntities(category, filters).then(function(result) {
      if (!result.items || result.items.length === 0) {
        gridEl.innerHTML = '<p class="no-results">لا توجد نتائج. جرّب البحث بكلمات مختلفة.</p>';
        if (pagEl) pagEl.innerHTML = '';
        return;
      }

      var html = '';
      result.items.forEach(function(ent) {
        var imgHtml = ent.image
          ? '<img alt="' + escHtml(ent.name) + '" class="smg-card-img" src="' + escHtml(ent.image) + '" loading="lazy">'
          : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:' + escHtml(meta.bg) + ';color:' + escHtml(meta.color) + '"><span class="material-icons-round" style="font-size:52px">' + escHtml(meta.icon) + '</span></div>';

        html += '<a class="smg-doctor-card" href="./entity.html?id=' + encodeURIComponent(ent.id) + '">'
              + '<div class="smg-doctor-card-img-wrap">' + imgHtml + '</div>'
              + '<div class="smg-doctor-card-body">'
              + '<h3>' + escHtml(ent.name) + '</h3>'
              + '<div class="spec">' + escHtml(meta.label) + '</div>'
              + '<div class="location"><span class="material-icons-round" style="font-size:16px">location_on</span> <span>' + escHtml(ent.address || 'شبين الكوم') + '</span></div>'
              + '<span class="smg-btn-detail">عرض التفاصيل <span class="material-icons-round" style="font-size:16px">visibility</span></span>'
              + '</div></a>';
      });

      gridEl.innerHTML = html;

      if (pagEl && result.totalPages > 1) {
        var phtml = '', cp = result.page, tp = result.totalPages;
        if (cp > 1) phtml += '<a onclick="SMG.goToPage(' + (cp - 1) + ')" title="السابق"><span class="material-icons-round">chevron_right</span></a>';
        for (var pg = 1; pg <= tp; pg++) {
          phtml += pg === cp ? '<span class="current">' + pg + '</span>' : '<a onclick="SMG.goToPage(' + pg + ')">' + pg + '</a>';
        }
        if (cp < tp) phtml += '<a onclick="SMG.goToPage(' + (cp + 1) + ')" title="التالي"><span class="material-icons-round">chevron_left</span></a>';
        pagEl.innerHTML = phtml;
      } else if (pagEl) {
        pagEl.innerHTML = '';
      }
    }).catch(function(err) {
      gridEl.innerHTML = '<p class="no-results">حدث خطأ أثناء تحميل البيانات.</p>';
      console.error('[SMG]', err);
    });
  };

  SMG.renderEntityProfile = function(id) {
    DataLayer.getEntity(id).then(function(ent) {
      var meta = SMG.getCategoryMeta(ent.category);
      document.title = ent.name + ' — دليل شبين الكوم الطبي';

      var descEl = document.getElementById('pageDesc');
      if (descEl) descEl.setAttribute('content', ent.name + ' — ' + (ent.subtitle || meta.name) + ' في شبين الكوم');

      var bCatEl = document.getElementById('breadcrumbCategory');
      if (bCatEl) {
        bCatEl.textContent = meta.listName;
        bCatEl.href = './listing.html?category=' + encodeURIComponent(ent.category);
      }

      var bName = document.getElementById('breadcrumbName');
      if (bName) bName.textContent = ent.name;

      var avatarEl = document.getElementById('entityAvatar');
      if (avatarEl) {
        if (ent.image) {
          avatarEl.innerHTML = '<img alt="' + escHtml(ent.name) + '" src="' + escHtml(ent.image) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
        } else {
          avatarEl.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:' + escHtml(meta.bg) + ';border-radius:50%"><span class="material-icons-round" style="font-size:3rem;color:' + escHtml(meta.color) + '">' + escHtml(meta.icon) + '</span></div>';
        }
      }

      var nameEl = document.getElementById('entityName');
      if (nameEl) nameEl.textContent = ent.name;

      var subEl = document.getElementById('entitySubtitle');
      if (subEl) subEl.textContent = ent.subtitle || '';

      var tagsEl = document.getElementById('entityTags');
      if (tagsEl) {
        tagsEl.innerHTML = '';
        var arr = (ent.tags && ent.tags.length) ? ent.tags : [meta.label];
        arr.forEach(function(t) {
          var sp = document.createElement('span');
          sp.textContent = t;
          tagsEl.appendChild(sp);
        });
      }

      var phonesEl = document.getElementById('entityPhones');
      var callBtn = document.getElementById('entityCallBtn');
      if (phonesEl) {
        var phones = ent.phones || [];
        if (phones.length) {
          var labels = ['رقم التواصل', 'هاتف ثانٍ', 'رقم آخر'];
          var icons = ['phone_iphone', 'phone', 'smartphone'];
          var ph = '';
          phones.forEach(function(num, idx) {
            var n = normPhone(num) || num;
            ph += '<a class="smg-dp2-phone-row" href="tel:' + n + '">'
                + '<div class="smg-dp2-phone-ico"><span class="material-icons-round">' + (icons[idx] || 'phone') + '</span></div>'
                + '<div class="smg-dp2-phone-info">'
                + '<div class="smg-dp2-phone-label">' + (labels[idx] || 'هاتف') + '</div>'
                + '<div class="smg-dp2-phone-number" dir="ltr">' + escHtml(n) + '</div>'
                + '</div></a>';
          });
          phonesEl.innerHTML = ph;
          if (callBtn) callBtn.setAttribute('href', 'tel:' + (normPhone(phones[0]) || phones[0]));
        } else {
          phonesEl.innerHTML = '<p class="smg-dp2-no-phone"><span class="material-icons-round">info</span> لا يوجد رقم هاتف متاح</p>';
        }
      }

      var addrEl = document.getElementById('addressText');
      if (addrEl) addrEl.textContent = ent.address || 'العنوان غير متوفر';

      var svcEl = document.getElementById('entityServices');
      if (svcEl) svcEl.textContent = ent.services || ent.subtitle || meta.name;

      var hoursEl = document.getElementById('entityHours');
      if (hoursEl && ent.hours) hoursEl.textContent = ent.hours;

      var copyBtn = document.getElementById('copyLinkBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function() {
          var btn = this;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
          } else {
            var ta = document.createElement('textarea');
            ta.value = window.location.href;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }
          btn.innerHTML = '<span class="material-icons-round">check</span> تم النسخ';
          setTimeout(function() {
            btn.innerHTML = '<span class="material-icons-round">content_copy</span> نسخ الرابط';
          }, 1500);
        });
      }

      var shareBtn = document.getElementById('shareBtn'),
          shareFallback = document.getElementById('shareFallback');

      if (shareBtn) {
        var pUrl = window.location.href, pTitle = ent.name + ' — دليل شبين الكوم الطبي';
        var wa = document.getElementById('shareWA'),
            fb = document.getElementById('shareFB'),
            msg = document.getElementById('shareMsg');

        if (wa) wa.href = 'https://wa.me/?text=' + encodeURIComponent(pTitle + ' ' + pUrl);
        if (fb) fb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pUrl);
        if (msg) msg.href = 'https://www.facebook.com/dialog/send?link=' + encodeURIComponent(pUrl) + '&app_id=0&redirect_uri=' + encodeURIComponent(pUrl);

        shareBtn.addEventListener('click', function() {
          if (navigator.share) navigator.share({ title: pTitle, url: pUrl }).catch(function() {});
          else if (shareFallback) shareFallback.style.display = shareFallback.style.display === 'none' ? 'block' : 'none';
        });
      }

      var schemaEl = document.getElementById('schemaOrg');
      if (schemaEl) {
        var schemaType = { hospitals: 'Hospital', pharmacies: 'Pharmacy', labs: 'DiagnosticLab', radiology: 'DiagnosticLab', emergency: 'EmergencyService' };
        var s = {
          '@context': 'https://schema.org',
          '@type': schemaType[ent.category] || 'LocalBusiness',
          'name': ent.name,
          'description': ent.subtitle || '',
          'address': {
            '@type': 'PostalAddress',
            'addressLocality': 'شبين الكوم',
            'addressRegion': 'المنوفية',
            'addressCountry': 'EG',
            'streetAddress': ent.address || ''
          },
          'telephone': (ent.phones && ent.phones[0]) || '',
          'url': window.location.href,
          'parentOrganization': {
            '@type': 'Organization',
            'name': 'دليل شبين الكوم الطبي',
            'url': window.location.origin
          }
        };
        if (ent.image) s.image = ent.image;
        schemaEl.textContent = JSON.stringify(s);
      }
    }).catch(function(err) {
      var n = document.getElementById('entityName');
      if (n) n.textContent = 'المنشأة غير موجودة';
      var b = document.getElementById('breadcrumbName');
      if (b) b.textContent = 'غير موجود';
      console.error('[SMG]', err);
    });
  };

  SMG.renderDoctorProfile = function(id) {
    DataLayer.getDoctor(id).then(function(doc) {
      document.title = doc.name + ' — دليل شبين الكوم الطبي';

      var descEl = document.getElementById('pageDesc');
      if (descEl) descEl.setAttribute('content', doc.name + ' — ' + (doc.subtitle || doc.specialty || '') + ' في شبين الكوم');

      var bName = document.getElementById('breadcrumbName');
      if (bName) bName.textContent = doc.name;

      var avatarEl = document.getElementById('doctorAvatar');
      if (avatarEl) {
        if (doc.image) {
          avatarEl.innerHTML = '<img alt="' + escHtml(doc.name) + '" src="' + escHtml(doc.image) + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
        } else {
          var init = doc.name ? (doc.name.indexOf('.') !== -1 ? doc.name[doc.name.indexOf('.') + 2] || 'د' : doc.name[0]) : 'د';
          avatarEl.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#e0f2fe;color:#008080;font-size:2.4rem;font-weight:800;border-radius:50%">' + escHtml(init || 'د') + '</div>';
        }
      }

      var nameEl = document.getElementById('doctorName');
      if (nameEl) nameEl.textContent = doc.name;

      var subEl = document.getElementById('doctorSubtitle');
      if (subEl) subEl.textContent = doc.subtitle || '';

      var tagsEl = document.getElementById('doctorTags');
      if (tagsEl) {
        tagsEl.innerHTML = '';
        var arr = (doc.tags && doc.tags.length) ? doc.tags : (doc.specialty ? [doc.specialty] : []);
        arr.forEach(function(t) {
          var sp = document.createElement('span');
          sp.textContent = t;
          tagsEl.appendChild(sp);
        });
      }

      var phonesEl = document.getElementById('doctorPhones');
      var callBtn = document.getElementById('doctorCallBtn');
      if (phonesEl) {
      var phones = [];

if (doc.phone1) phones.push(doc.phone1);
if (doc.phone2) phones.push(doc.phone2);
if (doc.phone3) phones.push(doc.phone3);
if (!phones.length && doc.phones) phones = doc.phones;
        if (phones.length) {
          var labels = ['موبايل الحجز', 'هاتف العيادة', 'رقم آخر'];
          var icons = ['phone_iphone', 'phone', 'smartphone'];
          var ph = '';
          phones.forEach(function(num, idx) {
            var n = normPhone(num) || num;
            ph += '<a class="smg-dp2-phone-row" href="tel:' + n + '">'
               + '<div class="smg-dp2-phone-ico"><span class="material-icons-round">' + (icons[idx] || 'phone') + '</span></div>'
               + '<div class="smg-dp2-phone-info">'
               + '<div class="smg-dp2-phone-label">' + (labels[idx] || 'هاتف') + '</div>'
               + '<div class="smg-dp2-phone-number" dir="ltr">' + escHtml(n) + '</div>'
               + '</div></a>';
          });
          phonesEl.innerHTML = ph;
          if (callBtn) callBtn.setAttribute('href', 'tel:' + (normPhone(phones[0]) || phones[0]));
        } else {
          phonesEl.innerHTML = '<p class="smg-dp2-no-phone"><span class="material-icons-round">info</span> لا يوجد رقم هاتف متاح</p>';
        }
      }

      var addrEl = document.getElementById('addressText');
      if (addrEl) addrEl.textContent = doc.address || 'العنوان غير متوفر';

      var svcEl = document.getElementById('doctorServices');
      if (svcEl) svcEl.textContent = doc.services || doc.subtitle || doc.specialty || '';

      var hoursEl = document.getElementById('doctorHours');
      if (hoursEl && doc.hours) hoursEl.textContent = doc.hours;

      var copyBtn = document.getElementById('copyLinkBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', function() {
          var btn = this;
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
          } else {
            var ta = document.createElement('textarea');
            ta.value = window.location.href;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
          }
          btn.innerHTML = '<span class="material-icons-round">check</span> تم النسخ';
          setTimeout(function() {
            btn.innerHTML = '<span class="material-icons-round">content_copy</span> نسخ الرابط';
          }, 1500);
        });
      }

      var shareBtn = document.getElementById('shareBtn'),
          shareFallback = document.getElementById('shareFallback');

      if (shareBtn) {
        var pUrl = window.location.href, pTitle = doc.name + ' — دليل شبين الكوم الطبي';
        var wa = document.getElementById('shareWA'),
            fb = document.getElementById('shareFB'),
            msg = document.getElementById('shareMsg');

        if (wa) wa.href = 'https://wa.me/?text=' + encodeURIComponent(pTitle + ' ' + pUrl);
        if (fb) fb.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pUrl);
        if (msg) msg.href = 'https://www.facebook.com/dialog/send?link=' + encodeURIComponent(pUrl) + '&app_id=0&redirect_uri=' + encodeURIComponent(pUrl);

        shareBtn.addEventListener('click', function() {
          if (navigator.share) navigator.share({ title: pTitle, url: pUrl }).catch(function() {});
          else if (shareFallback) shareFallback.style.display = shareFallback.style.display === 'none' ? 'block' : 'none';
        });
      }

      var schemaEl = document.getElementById('schemaOrg');
      if (schemaEl) {
        var s = {
          '@context':'https://schema.org',
          '@type':'Physician',
          'name':doc.name,
          'description':doc.subtitle || '',
          'medicalSpecialty':doc.specialty || '',
          'address':{
            '@type':'PostalAddress',
            'addressLocality':'شبين الكوم',
            'addressRegion':'المنوفية',
            'addressCountry':'EG',
            'streetAddress':doc.address || ''
          },
          'telephone':(doc.phones && doc.phones[0]) || '',
          'url':window.location.href,
          'parentOrganization':{
            '@type':'Organization',
            'name':'دليل شبين الكوم الطبي',
            'url':window.location.origin
          }
        };
        if (doc.image) s.image = doc.image;
        schemaEl.textContent = JSON.stringify(s);
      }
    }).catch(function(err) {
      var n = document.getElementById('doctorName');
      if (n) n.textContent = 'الطبيب غير موجود';
      var b = document.getElementById('breadcrumbName');
      if (b) b.textContent = 'غير موجود';
      console.error('[SMG]', err);
    });
  };

  initMobileMenu();
  window.SMG = SMG;
})(window);
