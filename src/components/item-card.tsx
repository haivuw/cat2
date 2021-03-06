import { CURRENCY } from 'helpers/constants';
import {
  ItemCardBase,
  ItemCardImage,
  ItemCardContent,
  ItemCardPrice,
} from './utils/theme';

interface ItemProps {
  image: string;
  name: string;
  price: number;
}

interface ItemCardProps {
  item: ItemProps;
  onClick?: (e: any) => void;
}

// height uthay dite hobe

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  return (
    <div className={ItemCardBase} onClick={onClick}>
      <div className={ItemCardImage}>
        <img
          className="object-cover"
          src={item.image}
          alt={' Alt ' + item.name}
        />
      </div>

      <div className={ItemCardContent}>
        <span className={ItemCardPrice}>
          {item.price ? (
            <>
              {CURRENCY}
              {item.price.toFixed(2)}
            </>
          ) : null}
        </span>
        <span className="text-13px">{item.name}</span>
      </div>
    </div>
  );
};

export default ItemCard;
