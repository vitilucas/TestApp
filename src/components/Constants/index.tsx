const O_INCLUIR = '1'
const O_ALTERAR = '2'
const O_EXCLUIR = '3'
const O_CONSULTAR = '4'
//
//
const O_CANCELAR = '7'

const getOperation = (x: string) => {
	if (x === '') {
		return O_INCLUIR
	} else if (x === 'Insert') {
		return O_INCLUIR
	} else if (x === 'Change') {
		return O_ALTERAR
	} else if (x === 'Delete') {
		return O_EXCLUIR
	} else if (x === 'Consult') {
		return O_CONSULTAR
		//
	} else if (x === 'Cancel') {
		return O_CANCELAR
	}
}

export default getOperation
