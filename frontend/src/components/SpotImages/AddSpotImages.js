import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min"


const AddSpotImages = () => {
    const { spotId } = useParams();
    const spotImagesStore = useSelector((state) => state.spotImages[spotId]);
}