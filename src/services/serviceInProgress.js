export function mealInProgress(id) {
  let newInProgress = [];
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgress) {
    newInProgress = { cocktails: {}, meals: { [id]: [] } };
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(newInProgress));
  } else {
    const array = inProgress.meals[id] ? [...inProgress.meals[id]] : [];
    newInProgress = {
      meals: { ...inProgress.meals, [id]: array },
      cocktails: { ...inProgress.cocktails },
    };
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(newInProgress));
  }
  return (newInProgress);
}

export function drinkInProgress(id) {
  let newInProgress = [];
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!inProgress) {
    newInProgress = { cocktails: { [id]: [] }, meals: { } };
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(newInProgress));
  } else {
    const array = inProgress.cocktails[id] ? [...inProgress.cocktails[id]] : [];
    newInProgress = { cocktails: { ...inProgress.cocktails, [id]: array },
      meals: { ...inProgress.meals } };
    localStorage.setItem('inProgressRecipes',
      JSON.stringify(newInProgress));
  }
  return (newInProgress);
}

export function doneRecipesVerifier(id) {
  const done = JSON.parse(localStorage.getItem('doneRecipes'));
  if (done && done.some((element) => element.id === id)) {
    return true;
  }
  return false;
}

export function inProgressRecipesVerifier(id) {
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  return !!(inProgress
    && ((inProgress.cocktails && inProgress.cocktails[id])
    || (inProgress.meals && inProgress.meals[id])));
}

const maxIndexCounter = 4;

export function increaseCarousel(isVisible, setIsVisible) {
  if (isVisible < maxIndexCounter) {
    setIsVisible(isVisible + 2);
  } else {
    setIsVisible(0);
  }
}

export function decreaseCarousel(isVisible, setIsVisible) {
  if (isVisible > 1) {
    setIsVisible(isVisible - 2);
  } else {
    setIsVisible(maxIndexCounter);
  }
}
