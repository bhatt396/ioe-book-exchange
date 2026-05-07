import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Book } from "@/data/mockBooks";
import { motion } from "framer-motion";

const conditionColors: Record<Book["condition"], string> = {
  New: "bg-success text-success-foreground",
  Good: "bg-info text-info-foreground",
  Used: "bg-warning text-warning-foreground",
};

const BookCard = ({ book }: { book: Book }) => {
  const imageSrc = book.imageUrl || book.image || "/placeholder.svg";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/book/${book.id}`}>
        <Card className="group overflow-hidden shadow-card transition-shadow hover:shadow-card-hover">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={imageSrc}
              alt={book.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <CardContent className="p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <Badge variant="secondary" className="text-xs">
                Sem {book.semester}
              </Badge>
              <Badge className={`text-xs ${conditionColors[book.condition]}`}>
                {book.condition}
              </Badge>
            </div>
            <h3 className="line-clamp-2 font-display text-sm font-semibold leading-tight text-foreground">
              {book.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-primary">
                Rs. {book.price}
              </span>
              <span className="text-xs text-muted-foreground">{book.sellerName}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default BookCard;
