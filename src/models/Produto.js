const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
	static init(sequelize) {
		super.init({
			nome: DataTypes.STRING,
			descricao: DataTypes.STRING,
			preco: DataTypes.STRING,
			imagem: DataTypes.STRING,
			tags: DataTypes.STRING,
			status: DataTypes.STRING,
		}, { sequelize });
	}

	static associate(models) {
		this.belongsToMany(models.Carrinho, { foreignKey: 'produto_id', through: 'carrinho_produtos', as: 'carrinho' });
		this.belongsToMany(models.Pedido, { foreignKey: 'produto_id', through: 'pedido_produtos', as: 'pedido' });
	}
}

module.exports = Produto;