const form = document.getElementById('krathong-form');
const river = document.getElementById('river');

function spawnKrathong(icon, name, wish) {
  const item = document.createElement('div');
  item.className = 'krathong-item';

  // สุ่มระดับความลึกในแม่น้ำ (10% ถึง 65% ของความสูงแม่น้ำ)
  const randomTop = Math.floor(Math.random() * 55) + 10;
  item.style.top = `${randomTop}%`;

  item.innerHTML = `
    <div class="wish-card">
      <strong>คุณ ${escapeHTML(name)}</strong>
      <span>"${escapeHTML(wish)}"</span>
    </div>
    <div class="krathong-icon">${icon}</div>
  `;

  river.appendChild(item);

  // ลบกระทงออกจากหน้าจอเมื่อลอยพ้นขอบขวาไปแล้ว (22 วินาที)
  setTimeout(() => {
    item.remove();
  }, 22000);
}

// ป้องกันการพิมพ์โค้ด HTML แปลกปลอม
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag]));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const selectedIcon = document.querySelector('input[name="krathongType"]:checked').value;
  const name = document.getElementById('userName').value.trim();
  const wish = document.getElementById('userWish').value.trim();

  if (name && wish) {
    spawnKrathong(selectedIcon, name, wish);
    form.reset();
  }
});

// ตัวอย่างกระทงเริ่มต้นตอนเปิดหน้าเว็บ
window.addEventListener('DOMContentLoaded', () => {
  spawnKrathong('🪷', 'สายน้ำ', 'ขอให้มีความสุข สุขภาพแข็งแรงตลอดปี');
});