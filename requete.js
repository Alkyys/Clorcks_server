// creation d'un user sans workspace
{
  "email": "test@test.fr",
  "name": "test",
  "id": "5db98456f0195ebfa4202dfc",
  "workspace": []
}

// creation de son workspace de base

{
  "name": "My WorkSpace",
  "user_id": "5db98456f0195ebfa4202dfc"
}

// creation d'une couleur

{
  "red": "100",
  "blue": "100",
  "green": "100",
  "alpha": "100"
}

// creation d'une palette

{
  "user_id": "5db98456f0195ebfa4202dfc",
    "label": "premiere palette",
      "colors_id": [
        "5db98f327b9e619908fbcfb5",
        "5db98f52bb7b80b99433d70f",
        "5db98f60bb7b80b99433d710"
      ],
      "workspace_id": "5db98970d98ef7b6a40161c4"
}

// creation d'un gradient

{
  "user_id": "5db98456f0195ebfa4202dfc",
  "label": "premier degrader",
  "stops": [
      {
          "color": "5db98f327b9e619908fbcfb5",
          "position": "25"
      },
      {
          "color": "5db98f52bb7b80b99433d70f",
          "position": "50"
      },
      {
          "color": "5db98f60bb7b80b99433d710",
          "position": "75"
      }
  ],
      "workspace_id": "5db98970d98ef7b6a40161c4"
}

