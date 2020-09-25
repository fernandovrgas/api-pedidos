const Produto = require('../models/Produto'),
	  config = require('../config/config')
;

module.exports = {
	// lista
	async index(req, res) {
		const { page = 1 } = req.query, // parametro da pagina a pesquisar default 1
			  paginate = config.enums.limitPaginacaoProduto // registros por pagina,
		;

		const produtos = await Produto.paginate({
			page, paginate,
			exclude: ['id', 'status', 'valor_total', 'createdAt' ],
			where: { status: config.enums.status.ativo }
		});

		return res.json(produtos);
	},

	// exibir detalhe de um registro
	async show(req, res) {
		const produto = await Produto.findByPk(req.params.id);
		return res.json(produto);
	},

	// criação
	async create(req, res) {
		const produto = await Produto.create(req.body);
		return res.json(produto);
	},

	// atualizar registro
	async update(req, res) {
		let produto = await Produto.update(req.body, {
			where: { id: req.params.id }
		});

		if (!produto) {
			return res.status(400).json({ error: 'Produto não localizado' });
		}

		produto = await Produto.findByPk(req.params.id);

		return res.json(produto);
	},

	// remover registro
	async delete(req, res) {
		await Produto.destroy({
			where: { id: req.params.id }
		});

		return res.send();
	}
}