/*
 * Comportamiento compartido entre las pantallas de selección de
 * productos a devolver (garantia-productos.html, devolucion-productos.html)
 * y la pantalla de motivo (motivo-devolucion.html).
 *
 * Real: "Indicar motivo" NO es un input inline — navega a una pantalla
 * propia con motivos predefinidos (ver motivo-devolucion.html) y vuelve
 * a la tabla de productos con el motivo ya cargado en esa fila.
 * Se usa sessionStorage para pasar el dato entre las dos páginas.
 */

function ppGoToMotivo(rowIndex) {
  sessionStorage.setItem('pp_motivo_return', location.pathname.split('/').pop());
  sessionStorage.setItem('pp_motivo_row', rowIndex);
  location.href = 'motivo-devolucion.html';
}

function ppSeleccionarMotivo(texto) {
  sessionStorage.setItem('pp_motivo_selected', texto);
  const returnPage = sessionStorage.getItem('pp_motivo_return') || 'devolucion-productos.html';
  location.href = returnPage;
}

function ppRestoreMotivo() {
  const returnPage = sessionStorage.getItem('pp_motivo_return');
  const row = sessionStorage.getItem('pp_motivo_row');
  const selected = sessionStorage.getItem('pp_motivo_selected');
  const currentPage = location.pathname.split('/').pop();

  if (returnPage === currentPage && selected && row !== null) {
    const tr = document.querySelectorAll('[data-row]')[Number(row)];
    if (tr) aplicarMotivoAFila(tr, selected);
    sessionStorage.removeItem('pp_motivo_return');
    sessionStorage.removeItem('pp_motivo_row');
    sessionStorage.removeItem('pp_motivo_selected');
  }
  ppActualizarContinuar();
}

function aplicarMotivoAFila(tr, texto) {
  const btn = tr.querySelector('.pp-icon-btn');
  const textBtn = tr.querySelector('.pp-indicar-motivo-btn');
  tr.querySelector('.motivo').textContent = texto;
  if (textBtn) textBtn.style.display = 'none';
  btn.textContent = '🗑';
  btn.classList.add('danger');
  btn.onclick = () => ppQuitarMotivo(btn);
}

function ppQuitarMotivo(btn) {
  const tr = btn.closest('tr');
  const rowIndex = [...document.querySelectorAll('[data-row]')].indexOf(tr);
  const textBtn = tr.querySelector('.pp-indicar-motivo-btn');
  tr.querySelector('.motivo').textContent = '';
  if (textBtn) textBtn.style.display = '';
  btn.textContent = '💬';
  btn.classList.remove('danger');
  btn.onclick = () => ppGoToMotivo(rowIndex);
  ppActualizarContinuar();
}

function ppActualizarContinuar() {
  const algunMotivo = [...document.querySelectorAll('.motivo')].some(td => td.textContent.trim());
  const btn = document.getElementById('btnContinuar');
  if (btn) btn.classList.toggle('muted', !algunMotivo);
}

function ppContinuar(destino) {
  const algunMotivo = [...document.querySelectorAll('.motivo')].some(td => td.textContent.trim());
  if (algunMotivo) location.href = destino;
}
