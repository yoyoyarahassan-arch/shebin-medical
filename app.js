/* ═══════════════════════════════════════════════════════
   Shebin Medical Guide — Static Site App Layer v3 (FINAL FIX)
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

  var DataLayer = {

    getDoctors: function(f) {
      return this._supabaseGetDoctors(f || {});
    },

    getDoctor: function(id) {
      return this._supabaseGetDoctor(id);
    },

    _headers: function() {
      return {
        apikey: CONFIG.supabase.anonKey,
        Authorization: 'Bearer ' + CONFIG.supabase.anonKey
      };
    },

    // 🔥 أهم تعديل هنا
    _supabaseGetDoctors: function(filters) {
      var url = CONFIG.supabase.url + '/rest/v1/doctors';
      var params = [];

      // ✅ عرض النشطين فقط
      params.push('is_active=eq.true');

      if (filters.q) {
        params.push('name=ilike.*' + encodeURIComponent(filters.q) + '*');
      }

      if (filters.specialty) {
        params.push('specialty=eq.' + encodeURIComponent(filters.specialty));
      }

      params.push('order=name.asc');

      url += '?' + params.join('&');

      return fetch(url, { headers: this._headers() })
        .then(r => r.json())
        .then(data => ({
          doctors: data || [],
          total: data.length,
          page: 1,
          totalPages: 1
        }));
    },

    // 🔥 منع فتح دكتور hidden
    _supabaseGetDoctor: function(id) {
      var url = CONFIG.supabase.url + '/rest/v1/doctors?id=eq.' + encodeURIComponent(id) + '&is_active=eq.true';

      return fetch(url, { headers: this._headers() })
        .then(r => r.json())
        .then(d => {
          if (d && d.length) return d[0];
          throw new Error('not found');
        });
    }
  };

  function esc(s) {
    return (s || '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  function norm(p) {
    return (p || '').replace(/[^\d+]/g, '');
  }

  var SMG = {};

  SMG.renderDoctorsGrid = function(id) {
    var el = document.getElementById(id);
    el.innerHTML = 'Loading...';

    DataLayer.getDoctors({}).then(res => {
      var html = '';

      res.doctors.forEach(d => {
        html += `
          <a href="./doctor.html?id=${d.id}">
            <h3>${esc(d.name)}</h3>
            <p>${esc(d.specialty)}</p>
          </a>
        `;
      });

      el.innerHTML = html || 'لا يوجد دكاترة';
    });
  };

  SMG.renderDoctorProfile = function(id) {
    DataLayer.getDoctor(id).then(d => {
      document.getElementById('doctorName').textContent = d.name;

      var phones = [d.phone1, d.phone2, d.phone3].filter(Boolean);

      document.getElementById('doctorPhones').innerHTML =
        phones.map(p => `<a href="tel:${norm(p)}">${p}</a>`).join('<br>');
    }).catch(() => {
      document.getElementById('doctorName').textContent = 'غير موجود';
    });
  };

  window.SMG = SMG;

})(window);
