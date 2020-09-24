module.exports = {
	server: {
		port: 3001
	},

	enums: {
		status: {
			'ativo': 'A',
			'inativo': 'I'
		},
		valorMinimoPedido: 10,
		statusPedido: {
			'novo': 1,
			'aceito': 2,
			'saiu_para_entrega': 3,
			'entregue': 4,
			'cancelado': 5
		},
		formaPagamento: {
			'dinheiro': 1,
			'cartao': 2
		}
	}
}