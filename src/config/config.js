module.exports = {
	server: {
		port: 3001
	},

	enums: {
		formaPagamento: {
			'dinheiro': 1,
			'cartao': 2
		},
		limitPaginacaoPedido: 2,
		status: {
			'ativo': 'A',
			'inativo': 'I'
		},
		statusPedido: {
			'novo': 1,
			'aceito': 2,
			'saiu_para_entrega': 3,
			'entregue': 4,
			'cancelado': 5
		},
		valorMinimoPedido: 10,
	}
}