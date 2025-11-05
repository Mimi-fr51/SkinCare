import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { api } from '../api'; // Ajustez selon votre structure

const Panier: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState('');

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Veuillez vous connecter pour commander');
        setIsCheckingOut(false);
        return;
      }

      const orderData = {
        orderItems: cartItems.map(item => {
          const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
          return {
            product: item.id,
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: price
          };
        }),
        shippingAddress: {
          address: "Adresse à compléter",
          city: "Paris", 
          postalCode: "75000",
          country: "France"
        },
        paymentMethod: "card",
        itemsPrice: calculateTotal(),
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: calculateTotal()
      };

      console.log('Envoi de la commande:', orderData);
      const result = await api.createOrder(orderData);
      
      if (result.success) {
        alert('🎉 Commande passée avec succès !');
        clearCart();
        window.location.href = '/confirmation';
      } else {
        setError(result.message || 'Erreur lors de la commande');
      }
    } catch (error: any) {
      console.error('Erreur complète:', error);
      setError(error.message || 'Erreur de connexion au serveur');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const totalFormatted = calculateTotal().toFixed(2).replace('.', ',') + '€';

  return (
    <div className="pt-20 min-h-screen bg-amber-50">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-amber-900 mb-8">Votre Panier</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-700 text-lg mb-4">Votre panier est vide</p>
            <button 
              onClick={() => window.history.back()}
              className="bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition-colors"
            >
              Continuer vos achats
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item) => {
                const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
                const priceFormatted = price.toFixed(2).replace('.', ',') + '€';
                
                return (
                  <div key={item.id} className="bg-white rounded-lg p-6 mb-4 shadow-sm flex items-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-6"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-900">{item.name}</h3>
                      <p className="text-amber-600">{priceFormatted}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-rose-500 hover:text-rose-700 ml-4"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <button 
                onClick={clearCart}
                className="text-rose-600 hover:text-rose-800 mt-4"
              >
                Vider le panier
              </button>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Résumé de commande</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Articles ({getTotalItems()})</span>
                  <span>{totalFormatted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{totalFormatted}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-amber-800 text-white py-3 rounded-lg hover:bg-amber-900 transition-colors font-semibold disabled:opacity-50"
              >
                {isCheckingOut ? 'Traitement...' : 'Commander'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Panier;