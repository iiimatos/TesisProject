import Swal from 'sweetalert2';
import { TYPE_ALERT } from './values.config';

export const basicAlert = (
  icon: TYPE_ALERT = TYPE_ALERT.SUCCESS,
  title: string
) => {
  Swal.fire({
    title,
    icon,
    timer: 20 * 100,
    showConfirmButton: false,
    timerProgressBar: true,
    toast: true,
    position: 'top-end',
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
};