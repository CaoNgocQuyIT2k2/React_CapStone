import { ADD_TO_CART, REMOVE_CART, THANH_TOAN, RESET_CART } from '../constant/movie';

const initialState = {
    dsGhe: [],
    cart: [],
  };
  

export let movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DS_GHE': {
        const newData = action.payload;
      console.log('[...newData]:' ,[...newData]);
        return { ...state, dsGhe: [...newData] };
      }
      
      case ADD_TO_CART: {
        const newCart = [...state.cart];
        const movieReducerState = state.movieReducer || {}; // Handle movieReducer being undefined
        const newDsGhe = (movieReducerState.dsGhe || []).map((hang) => {
          const newDanhSachGhe = (hang.danhSachGhe || []).map((ghe) => {
            if (ghe.maGhe === action.payload.selectedSeat.maGhe) {
              // Mark the corresponding seat as booked in dsGhe
              return { ...ghe, daDat: true };
            }
            return ghe;
          });
      
          return { ...hang, danhSachGhe: newDanhSachGhe };
        });
      
        const existingCartItem = newCart.find((item) => item.soGhe === action.payload.selectedSeat.maGhe);
      
        if (!existingCartItem) {
          // If the seat is not already in the cart, add it with quantity 1
          newCart.push({ ...action.payload.selectedSeat, daDat: true, quantity: 1 });
        }
      
        return { ...state, dsGhe: newDsGhe, cart: newCart };
      }
      
      case REMOVE_CART: {
        const removedSeat = action.payload;
        console.log('Before REMOVE_CART:', state.cart);
  
        // Remove the specific seat from the cart
        const newCart = state.cart.filter(item => item.maGhe !== removedSeat.maGhe);
  
        // Check if state.dsGhe is defined before attempting to map
        const newDsGhe = state.dsGhe ? state.dsGhe.map((hang) => {
          const newDanhSachGhe = hang.danhSachGhe.map((ghe) => {
            if (ghe.maGhe === removedSeat.maGhe) {
              return { ...ghe, daDat: false };
            }
            return ghe;
          });
  
          return { ...hang, danhSachGhe: newDanhSachGhe };
        }) : [];
  
        console.log('After REMOVE_CART:', newCart);
  
        return { ...state, dsGhe: newDsGhe, cart: newCart };
      }
      
      
      
      

    case THANH_TOAN: {
      const newDsGhe = state.dsGhe.map((hang) => {
        const newDanhSachGhe = hang.danhSachGhe.map((ghe) => {
          if (state.cart.some((item) => item.soGhe === ghe.soGhe)) {
            return { ...ghe, daDat: true, dangChon: false };
          }
          return ghe;
        });

        return { ...hang, danhSachGhe: newDanhSachGhe };
      });

      return { ...state, dsGhe: newDsGhe, cart: [] };
    }

    case RESET_CART: {
      // Reset trạng thái về mảng rỗng
      return { ...state, cart: [] };
    }

    default:
      return { ...state };
  }
};

export default movieReducer;